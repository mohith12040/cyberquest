// src/pages/RPGDashboard.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const sampleChallenges = [
  {
    id: 1,
    title: 'Spot the Phish',
    description: 'Identify phishing indicators in real email screenshots.',
    xp: 50,
    topic: 'Phishing',
    quiz: {
      question: 'Which of the following is a red flag for phishing?',
      options: [
        'An email from your known contact with proper grammar',
        'An unexpected email with urgent action required and suspicious link',
        'A weekly newsletter you subscribed to',
        'A message from your cloud storage reminding you of space limits'
      ],
      correctIndex: 1
    }
  },
  {
    id: 2,
    title: 'Password Cracker',
    description: 'Use a dictionary attack simulation to guess weak passwords.',
    xp: 60,
    topic: 'Authentication'
  }
  // ... other challenges remain the same for brevity
];

const RPGDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setXp(data.xp || 0);
        setCompleted(data.completed_challenges || []);
      }
    };
    fetchProfile();
  }, []);

  const handleAnswer = (index, challenge) => {
    if (index === challenge.quiz.correctIndex) {
      setFeedback('Correct! You gained ' + challenge.xp + ' XP.');
      handleComplete(challenge);
    } else {
      setFeedback('Incorrect. Try reviewing phishing red flags and come back.');
    }
    setTimeout(() => {
      setActiveQuiz(null);
      setFeedback(null);
    }, 3000);
  };

  const handleComplete = async (challenge) => {
    if (completed.includes(challenge.id)) return;
    const newXp = xp + challenge.xp;
    const newCompleted = [...completed, challenge.id];

    setXp(newXp);
    setCompleted(newCompleted);

    await supabase.from('profiles').update({
      xp: newXp,
      completed_challenges: newCompleted
    }).eq('id', profile.id);
  };

  return (
    <div className="max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, Agent {profile?.email}</h1>
      <p className="mb-6">XP: <strong>{xp}</strong></p>

      <h2 className="text-2xl font-semibold mb-2">Quests</h2>
      <div className="space-y-4">
        {sampleChallenges.map((ch) => (
          <div key={ch.id} className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl font-bold">{ch.title}</h3>
            <p>{ch.description}</p>
            <p className="text-sm text-gray-400">Topic: {ch.topic} • XP: {ch.xp}</p>
            {!completed.includes(ch.id) && ch.quiz ? (
              <button
                onClick={() => setActiveQuiz(ch)}
                className="mt-2 px-4 py-1 rounded bg-blue-600 hover:bg-blue-700"
              >
                Start Quiz
              </button>
            ) : (
              <button
                disabled
                className="mt-2 px-4 py-1 rounded bg-gray-600 cursor-not-allowed"
              >
                {completed.includes(ch.id) ? 'Completed' : 'No Quiz'}
              </button>
            )}
          </div>
        ))}
      </div>

      {activeQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">{activeQuiz.title}</h3>
            <p className="mb-4">{activeQuiz.quiz.question}</p>
            {activeQuiz.quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx, activeQuiz)}
                className="block w-full text-left px-4 py-2 my-1 bg-gray-700 hover:bg-purple-600 rounded"
              >
                {option}
              </button>
            ))}
            {feedback && <p className="mt-4 text-sm text-yellow-300">{feedback}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RPGDashboard;
