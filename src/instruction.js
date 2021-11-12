import React from 'react';
import { useGlobalContext } from './context';

function Instruction() {
  const { instruction, handleInstruction } = useGlobalContext();
  return (
    <div className={instruction ? 'instruction isOpen' : 'instruction'}>
      <div className='modal-content'>
        <h3>you have 30 secs to answer each question</h3>
        <button className='close-btn' onClick={handleInstruction}>
          continue
        </button>
      </div>
    </div>
  );
}

export default Instruction;
