import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
  const {
    correct,
    index,
    loading,
    waiting,
    questions,
    nextQuestion,
    correctAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { correct_answer, incorrect_answers, question } = questions[index];
  let answers = [...incorrect_answers];
  const newIndex = Math.floor(Math.random() * 4);
  console.log(newIndex);
  if (newIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[newIndex]);
    answers[newIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          {answers.map((answer, index) => {
            return (
              <button
                className='answer-btn'
                key={index}
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => {
                  correctAnswer(answer === correct_answer);
                }}
              />
            );
          })}
        </article>
        <button
          className='next-question'
          onClick={() => {
            nextQuestion();
          }}
        >
          next Question
        </button>
      </section>
    </main>
  );
}

export default App;
