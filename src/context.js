import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  general: 9,
  book: 10,
  film: 11,
  music: 12,
  nature: 17,
  animals: 27,
  celebrities: 26,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);
  const [isModal, setIsmodal] = useState(false);
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'animals',
    difficulty: 'easy',
  });
  const [start, setStart] = useState(1);
  const [instruction, setInstruction] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
        setInstruction(true);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
      setError(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldNumber) => {
      let index = oldNumber + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };
  const correctAnswer = (value) => {
    if (value) {
      setCorrect((oldNumber) => {
        return oldNumber + 1;
      });
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsmodal(true);
    setIndex(0);
  };
  const closeModal = () => {
    setWaiting(true);
    setIsmodal(false);
    setCorrect(0);
    setStart(0);
  };

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchData(url);
  };

  const handleInstruction = () => {
    setInstruction(false);
    setStart(5);
  };

  useEffect(() => {
    if (start === 5) {
      setTimeout(() => {
        openModal();
      }, 30000 * questions.length);
    }
  }, [start === 5]);

  return (
    <AppContext.Provider
      value={{
        correct,
        loading,
        waiting,
        index,
        isModal,
        questions,
        nextQuestion,
        correctAnswer,
        closeModal,
        handleForm,
        handleSubmit,
        quiz,
        error,
        instruction,
        handleInstruction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
