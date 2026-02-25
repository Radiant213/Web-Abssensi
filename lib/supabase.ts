import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client untuk frontend (tunduk pada RLS)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = (supabaseUrl && supabaseAnonKey)
	? createClient(supabaseUrl, supabaseAnonKey)
	: null as any;

// Client untuk API routes (bypass RLS, server-side only!)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey)
	? createClient(supabaseUrl, supabaseServiceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	})
	: null as any;
