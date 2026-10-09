"use client";

import Link from "next/link";
import { sendLead } from "@/lib/sendLead";
import { getAttribution, hasConsent } from "@/lib/tracking";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { fbq } from "@/lib/pixel";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import Icon from "@/components/Icon";

// ─── Config ────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const TEMPLATE_CLIENT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT!;
const TEMPLATE_OWNER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER!;
const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL!;

// ─── Constants ─────────────────────────────────────────────────────────────
const ALL_TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const steps = [
  { icon: "forum", label: "15-min intro call" },
  { icon: "search", label: "We audit your situation" },
  { icon: "rocket_launch", label: "You get a clear plan" },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Returns today + next 13 days (14 total), all in local midnight. */
function get14Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Convert "10:30" (24-hour) to total minutes since midnight */
function slotToMinutes(slot: string): number {
  const [h, m] = slot.split(":").map(Number);
  return h * 60 + m;
}

/** Filter slots: if today is selected, only show slots ≥ now + 30 min */
// Replace the function - now returns ALL slots with a past flag
function getSlots(date: Date | null): { slot: string; disabled: boolean }[] {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = date ? isSameDay(date, now) : false;

  return ALL_TIME_SLOTS.map((slot) => ({
    slot,
    disabled: isToday && slotToMinutes(slot) <= nowMinutes,
  }));
}

/** Build a Google Calendar add-event URL */
function buildGCalUrl(date: Date, time: string, name: string): string {
  // Parse the 24-hour slot into hours/minutes
  const [h, m] = time.split(":").map(Number);

  const start = new Date(date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 15);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=Call+with+OpenSite` +
    `&dates=${fmt(start)}/${fmt(end)}` +
    `&details=15-min+intro+call+with+OpenSite+Digital+Agency` +
    `&location=Google+Meet+(link+to+follow)`
  );
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function BookACallPage() {
  const days = get14Days();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fbq("ViewContent", { content_name: "Book A Call Page" });
  }, []);

  useEffect(() => {
    if (submitted) {
      fbq("Schedule");
    }
  }, [submitted]);
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const visibleDays = days.slice(weekOffset * 7, weekOffset * 7 + 7);
  // const availableSlots = getAvailableSlots(selectedDate);

  const formattedDate = selectedDate
    ? `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}`
    : null;

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setSending(true);
    setError(null);

    try {
      // ✅ Confirm to client via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: firstName,
          to_email: email,
          date: formattedDate ?? undefined,
          time: selectedTime,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      // ✅ Notify us by email - fire and forget, never block on this
      sendLead({
        subject: `New call booked: ${formattedDate} at ${selectedTime}`,
        name: `${firstName} ${lastName}`,
        email,
        phone,
        service: service ?? undefined,
        message: notes || undefined,
        date: formattedDate ?? undefined,
        time: selectedTime ?? undefined,
        page: "book-a-call",
        ...getAttribution(hasConsent()),
      }).catch(() => {}); // the booking is saved in the CRM either way
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      // Best-effort: also drop this into the CRM.
      supabase
        .from("leads")
        .insert({
          full_name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          source: "book_a_call",
          message: `Service: ${service || "-"}\nRequested: ${formattedDate} at ${selectedTime}\n\n${notes}`,
        } as never)
        .then(() => {});

      setSubmitted(true);
    } catch (err) {
      console.error("[book-call] submit error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };
  // ── Submitted state ────────────────────────────────────────────────────
  if (submitted && selectedDate && selectedTime) {
    const gcalUrl = buildGCalUrl(
      selectedDate,
      selectedTime,
      `${firstName} ${lastName}`,
    );
    return (
      <main className="min-h-screen bg-background pt-20">
        <section className="flex min-h-[80vh] items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full max-w-md rounded-[16px] border border-surface-border bg-surface-card p-12 text-center shadow-sm"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
              <Icon name="check_circle" className="text-4xl text-green-400" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-text-primary">
              You&apos;re booked, {firstName}!
            </h2>
            <p className="text-text-secondary text-sm mb-1">
              📅 {formattedDate} at {selectedTime} (Athens time)
            </p>
            <p className="text-text-secondary text-sm mb-8">
              A confirmation email has been sent to{" "}
              <strong className="text-text-primary">{email}</strong>. Check your
              inbox (and spam just in case).
            </p>

            <div className="flex flex-col gap-3">
              {/* Add to Google Calendar */}
              <a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-container-lowest px-5 py-3 text-sm font-medium text-text-primary transition-all hover:border-primary-container/40 hover:bg-surface-container-low"
              >
                <Icon name="calendar_add_on" className="text-[18px] text-primary-container" />
                Add to Google Calendar
              </a>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-6 text-xs text-text-secondary">
              We&apos;ll send a Google Meet link to your email before the call.
            </p>
          </motion.div>
        </section>
      </main>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="bg-primary-container py-16 text-white">
        <div className="mx-auto max-w-container-max px-4 sm:px-6 xl:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Let&apos;s talk about your project
            </h1>
            <p className="max-w-lg text-lg text-white/80">
              Pick a time that works for you. We&apos;ll spend 15 minutes
              understanding your goals, no pressure, no pitch.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon name={step.icon} className="text-[18px]" />
                  </div>
                  <span className="text-sm text-white/90">{step.label}</span>
                  {i < steps.length - 1 && (
                    <Icon name="arrow_forward" className="hidden text-white/40 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="mx-auto max-w-container-max px-4 sm:px-6 xl:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Left - contact details */}
            <div className="rounded-[16px] border border-surface-border bg-surface-card p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-text-primary">
                Your details
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                id="book-form"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                      First Name
                    </label>
                    <input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="Alex"
                      className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Last Name
                    </label>
                    <input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Johnson"
                      className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Email
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Phone
                  </label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+30 ..."
                    className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                    What are you looking to build?
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  >
                    <option value="">Select a service…</option>
                    <option>Website / Landing Page</option>
                    <option>E-commerce Store</option>
                    <option>Mobile App</option>
                    <option>SEO Strategy</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Anything else we should know?{" "}
                    <span className="text-text-secondary/50">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your goals, timeline, or current challenges…"
                    className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 text-text-primary outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </form>
            </div>

            {/* Right - date + time */}
            <div className="rounded-[16px] border border-surface-border bg-surface-card p-8 shadow-sm">
              <h2 className="mb-1 text-xl font-bold text-text-primary">
                Pick a date & time
              </h2>
              <p className="mb-6 text-sm text-text-secondary">
                All times in Athens time (Greece) · 15 min call
              </p>

              {/* Week nav */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">
                  {weekOffset === 0 ? "This week" : "Next week"}
                  <span className="ml-2 font-normal text-text-secondary">
                    {MONTH_NAMES[visibleDays[0].getMonth()]}
                    {visibleDays[0].getMonth() !== visibleDays[6].getMonth()
                      ? ` / ${MONTH_NAMES[visibleDays[6].getMonth()]}`
                      : ""}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setWeekOffset(0)}
                    disabled={weekOffset === 0}
                    className="rounded-lg p-1.5 text-text-secondary transition-all hover:bg-surface-container-lowest disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeekOffset(1)}
                    disabled={weekOffset === 1}
                    className="rounded-lg p-1.5 text-text-secondary transition-all hover:bg-surface-container-lowest disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Day pills */}
              <div className="mb-6 grid grid-cols-7 gap-1.5">
                {visibleDays.map((day) => {
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                  // Past dates - before today's midnight
                  const todayMidnight = new Date();
                  todayMidnight.setHours(0, 0, 0, 0);
                  const isPast = day < todayMidnight;
                  const disabled = isPast || isWeekend;

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => !disabled && handleDateSelect(day)}
                      disabled={disabled}
                      className={`flex flex-col items-center gap-1 rounded-xl border py-2.5 text-center transition-all
                        ${
                          isSelected
                            ? "border-primary-container bg-primary-container text-white shadow-sm"
                            : disabled
                              ? "border-surface-border bg-surface-container-lowest text-text-secondary/25 cursor-not-allowed line-through"
                              : "border-surface-border bg-surface-container-lowest text-text-primary hover:border-primary-container/50 hover:bg-surface-container-low cursor-pointer"
                        }`}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                        {DAY_NAMES[day.getDay()]}
                      </span>
                      <span className="text-base font-bold leading-none">
                        {day.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence mode="wait">
                {selectedDate ? (
                  <motion.div
                    key={selectedDate.toISOString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
                      Available times: {formattedDate}
                    </p>
                    {(() => {
                      const slots = getSlots(selectedDate);
                      const allPast = slots.every((s) => s.disabled);
                      return allPast ? (
                        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-surface-border">
                          <p className="text-sm text-text-secondary">
                            No slots left today, pick another day
                          </p>
                        </div>
                      ) : (
                        <div className="grid max-h-[220px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                          {slots.map(({ slot, disabled }) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => !disabled && setSelectedTime(slot)}
                              disabled={disabled}
                              className={`rounded-lg border px-2 py-2.5 text-xs font-medium transition-all
                                ${
                                  selectedTime === slot
                                    ? "border-primary-container bg-primary-container text-white shadow-sm"
                                    : disabled
                                      ? "border-surface-border bg-surface-container-lowest text-text-secondary/25 cursor-not-allowed line-through"
                                      : "border-surface-border bg-surface-container-lowest text-text-primary hover:border-primary-container/50 hover:bg-surface-container-low cursor-pointer"
                                }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-[120px] items-center justify-center rounded-xl border border-dashed border-surface-border"
                  >
                    <p className="text-sm text-text-secondary">
                      Select a date to see available times
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Confirm */}
              <button
                form="book-form"
                type="submit"
                disabled={!selectedDate || !selectedTime || sending}
                className={`mt-6 w-full rounded-xl py-4 text-sm font-medium text-white shadow-md transition-all
                  ${
                    selectedDate && selectedTime && !sending
                      ? "bg-primary-container cursor-pointer hover:opacity-90 active:scale-95"
                      : "bg-surface-border cursor-not-allowed opacity-50"
                  }`}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </span>
                ) : selectedDate && selectedTime ? (
                  `Confirm: ${formattedDate} at ${selectedTime} →`
                ) : (
                  "Select a date & time to continue"
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
                <Icon name="lock" className="text-[14px]" />
                No commitment. We&apos;ll confirm within 1 hour.
              </p>
              <p className="mt-2 text-center text-xs text-text-secondary">
                We use your details only to arrange and confirm this call.{" "}
                <Link href="/privacy-policy/" className="text-primary hover:underline">
                  Privacy policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
