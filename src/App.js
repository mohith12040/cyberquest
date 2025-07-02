import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in on load
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // GitHub login handler
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) console.error('Login error:', error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <h1>CyberQuest</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
    </div>
  );
}

export default App;

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  });
  if (error) console.error('Login error:', error.message);
};

