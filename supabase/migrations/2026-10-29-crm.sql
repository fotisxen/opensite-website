-- ---------------------------------------------------------------------
-- CRM upgrade (2026-10-29): turns `leads` into the sales pipeline for
-- every channel (cold email, Instagram DMs, Google Ads, site forms,
-- referrals) and adds `lead_activities`, one row per touchpoint, so
-- follow-ups and the funnel can be counted by date.
--
-- Safe to run more than once. Run it in Supabase → SQL Editor, then run
-- the generated import (leads/pipeline/crm-import.sql).
-- ---------------------------------------------------------------------

alter table leads add column if not exists company text;
alter table leads add column if not exists website text;
alter table leads add column if not exists city text;
alter table leads add column if not exists sector text;
alter table leads add column if not exists channel text; -- cold_email, instagram, google_ads, site_form, referral, other
alter table leads add column if not exists demo_url text;
alter table leads add column if not exists value numeric(12,2);
alter table leads add column if not exists last_contact_at timestamptz;
alter table leads add column if not exists next_followup_at date;
alter table leads add column if not exists followups_sent int not null default 0;
-- Stable key for scripted imports (lowercased email or "demo:<slug>"),
-- so re-running an import updates rows instead of duplicating them.
alter table leads add column if not exists external_key text;
create unique index if not exists leads_external_key_idx on leads(external_key);
create index if not exists leads_next_followup_idx on leads(next_followup_at);

-- Pipeline stages. "qualified" stays allowed for rows created before this.
alter table leads drop constraint if exists leads_status_check;
alter table leads add constraint leads_status_check
  check (status in ('new','contacted','replied','demo','proposal','won','lost','qualified'));

create table if not exists lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  kind text not null check (kind in ('email','followup','dm','call','meeting','reply','proposal','note','bounce')),
  at timestamptz not null default now(),
  note text,
  external_key text unique -- e.g. "email:2026-10-26:info@x.gr", keeps imports idempotent
);

create index if not exists lead_activities_lead_idx on lead_activities(lead_id, at desc);

alter table lead_activities enable row level security;

drop policy if exists "only agents can access lead activities" on lead_activities;
create policy "only agents can access lead activities"
  on lead_activities for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
