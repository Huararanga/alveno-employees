import { Database } from "../../app/db/supabase";

export type Team = Database['public']['Tables']['teams']['Row'];