import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://pfylqjfihfbyioyhccrv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeWxxamZpaGZieWlveWhjY3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwODc0NDgsImV4cCI6MjA2MTY2MzQ0OH0.O079ZqNRABC8XM0hMFmSxfrYM1ABHThzViZ3Z-6cdWU';

export async function getJobs( token, {location, company_id, searchQuery }){
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            },
    });

    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id)")

    if(location){
        query = query.eq("location", location);
    }

    if(company_id){
        query = query.eq("company_id", company_id);
    }

    if(searchQuery){
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if(error){
        console.error("Error fetching jobs:", error);
        return null;
    }

    return data;
}