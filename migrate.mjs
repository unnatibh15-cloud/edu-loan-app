import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load your local environment keys
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase keys in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  try {
    // 1. Locate and read your local JSON file
    const filePath = path.join(process.cwd(), 'lib', 'universities-db.json');
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Could not find your JSON file at: ${filePath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    const universities = JSON.parse(rawData);

    console.log(`⏳ Found ${universities.length} entries. Uploading to Supabase...`);

    // 2. Map your local JSON keys to match your database columns exactly
    const formattedData = universities.map(uni => ({
      name: uni.name,
      country: uni.country,
      ranking: uni.ranking || null,
      average_tuition_fee_inr: uni.average_tuition_fee_inr || uni.tuition_fee || null,
      min_cgpa_cutoff: uni.min_cgpa_cutoff || uni.cgpa || null,
      min_ielts_score: uni.min_ielts_score || uni.ielts || null,
      popular_degrees: uni.popular_degrees || [],
      primary_skills_required: uni.primary_skills_required || []
    }));

    // 3. Insert the data in chunks of 100 to avoid request size limits
    const chunkSize = 100;
    for (let i = 0; i < formattedData.length; i += chunkSize) {
      const chunk = formattedData.slice(i, i + chunkSize);
      const { error } = await supabase.from('universities').insert(chunk);
      
      if (error) throw error;
      console.log(`✅ Uploaded rows ${i + 1} to ${Math.min(i + chunkSize, formattedData.length)}`);
    }

    console.log('🎉 Database seeding complete! All data is live in Tokyo.');

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  }
}

seedDatabase();