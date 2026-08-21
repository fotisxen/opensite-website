export interface Agent {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export interface Client {
  id: string;
  full_name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  agent_id: string | null;
  created_at: string;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

export interface Lead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  message: string | null;
  status: LeadStatus;
  notes: string | null;
  converted_client_id: string | null;
  agent_id: string | null;
  created_at: string;
}

export type ProjectService = "web_development" | "seo_strategy" | "ui_ux_design" | "crm" | "other";
export type ProjectStage = "contact" | "proposal" | "in_progress" | "review" | "closed_won" | "closed_lost";

export interface Project {
  id: string;
  title: string;
  client_id: string | null;
  service: ProjectService | null;
  stage: ProjectStage;
  value: number | null;
  expected_close_date: string | null;
  notes: string | null;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
}

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string | null;
  amount: number;
  occurred_on: string;
  description: string | null;
  client_id: string | null;
  project_id: string | null;
  agent_id: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: Agent;
        Insert: Partial<Agent> & Pick<Agent, "full_name" | "email">;
        Update: Partial<Agent>;
      };
      clients: {
        Row: Client;
        Insert: Partial<Client> & Pick<Client, "full_name">;
        Update: Partial<Client>;
      };
      leads: {
        Row: Lead;
        Insert: Partial<Lead> & Pick<Lead, "full_name">;
        Update: Partial<Lead>;
      };
      projects: {
        Row: Project;
        Insert: Partial<Project> & Pick<Project, "title">;
        Update: Partial<Project>;
      };
      transactions: {
        Row: Transaction;
        Insert: Partial<Transaction> & Pick<Transaction, "type" | "amount">;
        Update: Partial<Transaction>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
