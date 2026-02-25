import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client untuk frontend (tunduk pada RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client untuk API routes (bypass RLS, server-side only!)
export const supabaseAdmin = createClient(
	supabaseUrl,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
);
