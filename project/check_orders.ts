import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_ANON_KEY as string);

async function run() {
    const { data, error } = await supabase.from('orders').select('id, payment_proof_url, payment_status');
    console.log("Orders:", data?.filter(d => d.payment_proof_url));
    console.log("Error:", error);
}

run();
