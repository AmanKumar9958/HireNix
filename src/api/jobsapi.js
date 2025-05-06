import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://pfylqjfihfbyioyhccrv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeWxxamZpaGZieWlveWhjY3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwODc0NDgsImV4cCI6MjA2MTY2MzQ0OH0.O079ZqNRABC8XM0hMFmSxfrYM1ABHThzViZ3Z-6cdWU';

// for getting jobs..
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

// for getting saved jobs..
export async function toggleSavedJobs( token, {alreadySave}, savedData){
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            },
    });

    if(alreadySave){
        const {data, error: deleteError} = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", savedData.job_id)

        if(deleteError){
            console.error("Error Deleting Saved Jobs:", deleteError);
            return null;
        }

        return data;
    } else{
        const {data, error: insertError} = await supabase
        .from("saved_jobs")
        .insert([savedData])
        .select()

        if(insertError){
            console.error("Error Saving Jobs:", insertError);
            return null;
        }

        return data;
    }

    return data;
}

export async function getSavedJobs(token, userId) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        },
    });

    const { data, error } = await supabase
        .from("saved_jobs")
        .select("job_id")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching saved jobs:", error);
        return [];
    }

    return data;
}
