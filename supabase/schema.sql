-- Run this in the Supabase SQL editor. Re-runnable — safe to run again
-- after adding new statements below (create/alter use if-not-exists,
-- policies are dropped and recreated).
--
-- This is a client-side-only CRM: the site is statically exported
-- (next.config.ts has output: "export"), so there is no server to gate
-- /admin behind — the admin pages check the Supabase session in the
-- browser and redirect to /admin/login if there isn't one. Real security
-- comes entirely from the RLS policies below, not from routing.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Agents (Opensite staff who log in to /admin)
-- ---------------------------------------------------------------------
create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Clients — the agency's own clients (not site visitors).
-- ---------------------------------------------------------------------
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text,
  phone text,
  notes text,
  agent_id uuid references agents(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Leads — prospects, mostly captured from the public contact and
-- book-a-call forms. Those forms run entirely in the browser (this site
-- has no server), so leads needs a public INSERT policy; nothing else
-- on this table is public.
-- ---------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  source text, -- "contact_form", "book_a_call", "referral", ...
  message text,
  status text not null default 'new' check (status in ('new','contacted','qualified','lost')),
  notes text,
  converted_client_id uuid references clients(id) on delete set null,
  agent_id uuid references agents(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on leads(status);

-- ---------------------------------------------------------------------
-- Projects — a client engagement, e.g. "Website redesign — Acme Co".
-- `service` mirrors the site's own /services pages so pipeline and
-- marketing line up.
-- ---------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_id uuid references clients(id) on delete set null,
  service text check (service in ('web_development','seo_strategy','ui_ux_design','crm','other')),
  stage text not null default 'contact'
    check (stage in ('contact','proposal','in_progress','review','closed_won','closed_lost')),
  value numeric(12,2),
  expected_close_date date,
  notes text,
  agent_id uuid references agents(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_stage_idx on projects(stage);
create index if not exists projects_client_id_idx on projects(client_id);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
  before update on projects
  for each row execute procedure set_updated_at();

-- ---------------------------------------------------------------------
-- Transactions — income/expenses, one table filterable by type/category.
-- ---------------------------------------------------------------------
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('income','expense')),
  category text,
  amount numeric(12,2) not null,
  occurred_on date not null default current_date,
  description text,
  client_id uuid references clients(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  agent_id uuid references agents(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists transactions_type_idx on transactions(type);
create index if not exists transactions_occurred_on_idx on transactions(occurred_on);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table agents enable row level security;
alter table clients enable row level security;
alter table leads enable row level security;
alter table projects enable row level security;
alter table transactions enable row level security;

drop policy if exists "agents can read agent list" on agents;
create policy "agents can read agent list"
  on agents for select
  using (auth.role() = 'authenticated');

drop policy if exists "only agents can access clients" on clients;
create policy "only agents can access clients"
  on clients for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Leads: anyone can submit one (the public contact/book-a-call forms),
-- but only agents can read, update, or delete.
drop policy if exists "anyone can submit a lead" on leads;
create policy "anyone can submit a lead"
  on leads for insert
  with check (true);

drop policy if exists "only agents can read leads" on leads;
create policy "only agents can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

drop policy if exists "only agents can modify leads" on leads;
create policy "only agents can modify leads"
  on leads for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "only agents can delete leads" on leads;
create policy "only agents can delete leads"
  on leads for delete
  using (auth.role() = 'authenticated');

drop policy if exists "only agents can access projects" on projects;
create policy "only agents can access projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "only agents can access transactions" on transactions;
create policy "only agents can access transactions"
  on transactions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
