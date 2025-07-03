// src/pages/RPGDashboard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sampleChallenges from '../data/sampleChallenges';
import { marked } from 'marked';

function RPGDashboard() {
  const { id } = useParams();
  const challenge = sampleChallenges.find((c) => c.id === parseInt(id));

  const [quizStarted, setQuizStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (challenge?.quiz?.questions) {
      const shuffled = [...challenge.quiz.questions].sort(() => 0.5 - Math.random()).slice(0, 10);
      setShuffledQuestions(shuffled);
    }
  }, [challenge]);

  const handleAnswer = (index) => {
    const correct = shuffledQuestions[currentQuestion].correctIndex;
    setSelectedAnswers([...selectedAnswers, index]);
    if (index === correct) setScore(score + 1);

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (!challenge) return <div className="text-white p-4">Challenge not found</div>;

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
      <p className="text-gray-400 mb-6">XP: {challenge.xp}</p>

      {!quizStarted && !showResults && (
        <>
          <div className="prose prose-invert max-w-none mb-6 whitespace-pre-line">
            <h2 className="text-2xl font-semibold mb-4">Tutorial</h2>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(challenge.tutorial) }} />
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded text-white font-semibold"
          >
            Start Quiz
          </button>
        </>
      )}

      {quizStarted && !showResults && shuffledQuestions.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-gray-400 mb-2">Question {currentQuestion + 1} of {shuffledQuestions.length}</p>
          <div className="bg-gray-800 rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">{shuffledQuestions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {shuffledQuestions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="block w-full text-left px-4 py-3 rounded bg-gray-700 hover:bg-purple-600 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
          <p className="text-gray-300 mb-4">You scored {score} out of {shuffledQuestions.length}</p>
          <div className="space-y-4">
            {shuffledQuestions.map((q, i) => (
              <div
                key={i}
                className={`p-3 rounded border ${selectedAnswers[i] === q.correctIndex ? 'border-green-500' : 'border-red-500'}`}
              >
                <p className="font-semibold">Q{i + 1}: {q.question}</p>
                <p>Your Answer: <span className="italic">{q.options[selectedAnswers[i]]}</span></p>
                <p>Correct Answer: <span className="font-bold text-green-400">{q.options[q.correctIndex]}</span></p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setQuizStarted(false);
              setShowResults(false);
              setCurrentQuestion(0);
              setSelectedAnswers([]);
              setScore(0);
            }}
            className="mt-6 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Restart Quest
          </button>
        </div>
      )}
    </div>
  );
}

export default RPGDashboard;
