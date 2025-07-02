// src/pages/RPGDashboard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import sampleChallenges from '../data/sampleChallenges';

const RPGDashboard = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuest, setCurrentQuest] = useState(null);

  useEffect(() => {
    const foundQuest = sampleChallenges.find((q) => q.id === parseInt(id));
    if (foundQuest) {
      setCurrentQuest(foundQuest);
    }
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setXp(data.xp || 0);
        setCompleted(data.completed_challenges || []);
      }
    };
    fetchProfile();
  }, []);

  const startQuiz = () => {
    if (!currentQuest) return;
    setActiveQuiz({
      ...currentQuest,
      questions: currentQuest.quiz.questions.sort(() => Math.random() - 0.5)
    });
    setQuizIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (selectedIdx) => {
    const question = activeQuiz.questions[quizIndex];
    setAnswers([...answers, { selectedIdx, correctIdx: question.correctIndex }]);
    if (quizIndex + 1 < activeQuiz.questions.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowResults(true);
      handleComplete(currentQuest);
    }
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

  if (!currentQuest) return <div className="text-white p-6">Quest not found.</div>;

  return (
    <div className="max-w-3xl mx-auto text-white px-4 pb-24">
      <h1 className="text-3xl font-bold mb-2">{currentQuest.title}</h1>
      <p className="text-gray-300 mb-4">{currentQuest.description}</p>
      {!completed.includes(currentQuest.id) ? (
        <div className="space-x-2 mb-4">
          <button onClick={() => setActiveTutorial(currentQuest)} className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600">Read Tutorial</button>
          <button onClick={startQuiz} className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">Start Quiz</button>
        </div>
      ) : (
        <p className="text-green-400 mb-4">✓ Quest Completed</p>
      )}

      {/* Tutorial Modal */}
      {activeTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 max-w-2xl rounded overflow-y-auto max-h-[90vh] shadow-xl">
            <h3 className="text-2xl font-bold mb-4">{activeTutorial.title} - Tutorial</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed">{activeTutorial.tutorial}</pre>
            <div className="text-right mt-4">
              <button onClick={() => setActiveTutorial(null)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuiz && !showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-2">{activeQuiz.title} - Question {quizIndex + 1} of {activeQuiz.questions.length}</h3>
            <p className="mb-4 text-gray-300">{activeQuiz.questions[quizIndex].question}</p>
            {activeQuiz.questions[quizIndex].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="block w-full text-left bg-gray-700 hover:bg-purple-600 text-white px-4 py-2 rounded mb-2"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Modal */}
      {activeQuiz && showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">{activeQuiz.title} - Results</h3>
            <p className="mb-4">You scored <strong>{answers.filter(a => a.selectedIdx === a.correctIdx).length}</strong> out of {answers.length}</p>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {activeQuiz.questions.map((q, idx) => (
                <div key={idx} className="bg-gray-800 p-3 rounded">
                  <p className="text-sm font-semibold text-white">Q{idx + 1}: {q.question}</p>
                  <p className={`text-sm mt-1 ${answers[idx].selectedIdx === q.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                    Your answer: {q.options[answers[idx].selectedIdx]}
                  </p>
                  {answers[idx].selectedIdx !== q.correctIndex && (
                    <p className="text-sm text-green-300">Correct answer: {q.options[q.correctIndex]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="text-right mt-4">
              <button onClick={() => setActiveQuiz(null)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RPGDashboard;
