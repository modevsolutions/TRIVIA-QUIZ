import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { handleForm, handleSubmit, quiz, error } = useGlobalContext();
  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <h2>trivia quiz</h2>
          {/* amount */}
          <div className='form-control'>
            <label htmlFor='amount'>number of question</label>
            <input
              type='number'
              className='form-input'
              min='1'
              max='50'
              name='amount'
              value={quiz.amount}
              onChange={handleForm}
            />
          </div>
          {/* category */}
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              value={quiz.category}
              className='form-input'
              onChange={handleForm}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
              <option value='general'>general</option>
              <option value='nature'>nature</option>
              <option value='celebrities'>celebrities</option>
              <option value='animals'>animals</option>
              <option value='book'>book</option>
              <option value='film'>film</option>
              <option value='music'>music</option>
            </select>
          </div>
          {/* difficulty*/}
          <div className='form-control'>
            <label htmlFor='difficulty'>difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handleForm}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              cant generate questions please try fewer number of questions
            </p>
          )}
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
