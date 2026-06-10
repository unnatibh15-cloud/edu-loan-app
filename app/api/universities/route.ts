import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Access variables securely from your environment file (.env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters passed from your frontend
    const country = searchParams.get('country');
    const cgpa = parseFloat(searchParams.get('cgpa') || '0');
    const ielts = parseFloat(searchParams.get('ielts') || '0');

    let query = supabase.from('universities').select('*');

    // Dynamic database filtering
    if (country) {
      query = query.eq('country', country);
    }
    if (cgpa > 0) {
      query = query.lte('min_cgpa_cutoff', cgpa);
    }
    if (ielts > 0) {
      query = query.lte('min_ielts_score', ielts);
    }

    const { data, error } = await query.order('ranking', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}