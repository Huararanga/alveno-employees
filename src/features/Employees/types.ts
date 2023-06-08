import { Database } from "../../app/db/supabase";

export type Employee = Database['public']['Tables']['employees']['Row'];
export type InsertEmployee = Database['public']['Tables']['employees']['Insert'];
export type UpdateEmployee = Database['public']['Tables']['employees']['Update'];

export type EmployeeWithTeam = Employee & { teamName: string | null };