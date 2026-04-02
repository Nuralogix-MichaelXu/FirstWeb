import { getSupabaseClient } from '../config/supabase.js';

export function getUserLabel(user) {
  const meta = user?.user_metadata || {};
  return (
    meta.name ||
    meta.full_name ||
    meta.username ||
    user?.email ||
    user?.phone ||
    user?.id ||
    '已登录'
  );
}

export function initSupabaseAuth() {
  const supabase = getSupabaseClient();

  const listeners = new Set();
  let currentSession = null;

  function emit(session) {
    for (const cb of listeners) cb(session);
  }

  async function refreshSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    currentSession = data.session;
    emit(currentSession);
    return currentSession;
  }

  function onAuthChange(cb) {
    listeners.add(cb);
    cb(currentSession);
    return () => listeners.delete(cb);
  }

  async function signInWithPassword({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    return supabase.auth.signOut();
  }

  // init + subscribe
  refreshSession().catch(() => {});
  supabase.auth.onAuthStateChange((_event, session) => {
    currentSession = session;
    emit(session);
  });

  return {
    supabase,
    getSession: () => currentSession,
    refreshSession,
    onAuthChange,
    signInWithPassword,
    signOut,
  };
}

