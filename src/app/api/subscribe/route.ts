import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!;
  // API key ends with -us1, -us2, etc. — that's your datacenter
  const DC = API_KEY.split("-").at(-1);

  const res = await fetch(
    `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed", // use "pending" if you want double opt-in
        tags: ["insights-subscriber"],
      }),
    },
  );

  // 200 = new sub, 400 with title "Member Exists" = already subscribed (treat as success)
  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  const data = await res.json();
  if (data?.title === "Member Exists") {
    return NextResponse.json({ ok: true }); // already on the list, no error shown
  }

  return NextResponse.json(
    { error: data?.detail || "Failed" },
    { status: 500 },
  );
}
