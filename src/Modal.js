import React from 'react';
import { useGlobalContext } from './context';

const Modal = () => {
  const { isModal, correct, questions, closeModal } = useGlobalContext();

  return (
    <div className={isModal ? 'modal-container isOpen' : 'modal-container'}>
      <article className='modal-content'>
        <h3>
          {correct >= questions.length / 2
            ? 'congrats!!!'
            : 'you can do better'}
        </h3>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
          qustions correctly
        </p>
        <button
          className='close-btn'
          onClick={() => {
            closeModal();
          }}
        >
          play again
        </button>
      </article>
    </div>
  );
};

export default Modal;
