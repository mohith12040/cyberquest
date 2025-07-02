import React from 'react';

function Home({ session }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to CyberQuest</h1>
      <p className="mt-2">Logged in as {session.user.email}</p>
    </div>
  );
}

export default Home;

