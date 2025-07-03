// src/pages/PhishingQuest.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sampleChallenges from '../data/sampleChallenges';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';
import { supabase } from '../supabaseClient';

function PhishingQuest({ session }) {
  const challenge = sampleChallenges.find((q) => q.id === 1);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase.from('Players').select('*').eq('id', session.user.id).single();
      if (data) {
        setPlayerData(data);
      }
      setLoading(false);
    };
    fetchPlayer();
  }, [session]);

  useEffect(() => {
    if (startQuiz) {
      const shuffled = [...challenge.quiz.questions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 10));
    }
  }, [startQuiz]);

  const handleAnswer = (index) => {
    setAnswers([...answers, index]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
      updateXP();
    }
  };

  const updateXP = async () => {
    const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const gainedXP = correctCount * 10;
    const newXP = (playerData?.xp || 0) + gainedXP;
    const newLevel = Math.floor(newXP / 60) + 1;
    await supabase.from('Players').update({ xp: newXP, level: newLevel }).eq('id', session.user.id);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResults(false);
    setStartQuiz(false);
  };

  const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8 flex flex-col items-center justify-start">
      <div className="max-w-3xl w-full">
        {!startQuiz ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 p-6 rounded shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">{challenge.title}</h2>
            <div
              className="prose prose-invert max-w-none text-gray-200"
              dangerouslySetInnerHTML={{ __html: marked.parse(challenge.tutorial) }}
            />
            <button
              onClick={() => setStartQuiz(true)}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
            >
              Start Quiz
            </button>
          </motion.div>
        ) : !showResults ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Question {current + 1}</h2>
              <p className="mb-4 text-lg">{questions[current]?.question}</p>
              <div className="space-y-2">
                {questions[current]?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left bg-gray-800 hover:bg-purple-700 rounded p-3 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="mb-4 text-lg">
              You got <span className="text-green-400 font-bold">{correctCount}</span> out of {questions.length} correct.
            </p>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="bg-gray-800 p-3 rounded">
                  <p className="font-medium">{i + 1}. {q.question}</p>
                  <p className={`text-sm mt-1 ${answers[i] === q.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                    Your answer: {q.options[answers[i]]}
                  </p>
                  {answers[i] !== q.correctIndex && (
                    <p className="text-sm text-yellow-300">Correct answer: {q.options[q.correctIndex]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={restart}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default PhishingQuest;
