import { createClient } from './server'

export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Map the auth user to our 'team' table
  const { data: profile } = await supabase
    .from('team')
    .select('*')
    .eq('email', user.email)
    .single()

  return profile || { email: user.email, name: 'Unknown User', is_admin: false }
}

export async function isAdmin() {
    const profile = await getUserProfile()
    return profile?.is_admin === true
}
