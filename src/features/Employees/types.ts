import { Database } from "../../app/db/supabase";

export type Employee = Database['public']['Tables']['employees']['Row'];

export type EmployeeWithTeam = Employee & { teamName: string | null };