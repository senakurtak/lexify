import { useState, useCallback } from 'react';
import { words } from '../data/words';
import type { Word } from '../data/words';

export interface Question {
  word: Word;
  displayDefinition: string;
  isMatch: boolean;
}

export interface AnswerRecord {
  questionIndex: number;
  word: Word;
  displayDefinition: string;
  isMatch: boolean;
  answeredCorrectly: boolean;
}

const ROUND_SIZE = 20;
const MATCH_COUNT = ROUND_SIZE / 2; // 10
const POINTS_PER_CORRECT = 10;

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildQuestions(): Question[] {
  const shuffled = shuffle(words);

  // First 20 words are featured; of those, first 10 are match questions
  const featured = shuffled.slice(0, ROUND_SIZE);
  // Next 10 from the remainder are distractors (one per mismatch question)
  const distractorPool = shuffled.slice(ROUND_SIZE, ROUND_SIZE + MATCH_COUNT);

  const matchQuestions: Question[] = featured.slice(0, MATCH_COUNT).map((word) => ({
    word,
    displayDefinition: word.definition,
    isMatch: true,
  }));

  const mismatchQuestions: Question[] = featured.slice(MATCH_COUNT).map((word, i) => ({
    word,
    displayDefinition: distractorPool[i].definition,
    isMatch: false,
  }));

  return shuffle([...matchQuestions, ...mismatchQuestions]);
}

export function useGame() {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);

  const isComplete = questionIndex >= ROUND_SIZE;
  const currentQuestion = isComplete ? null : questions[questionIndex];

  const submitAnswer = useCallback(
    (answeredCorrectly: boolean) => {
      if (isComplete) return;

      const question = questions[questionIndex];

      setAnswerHistory((prev) => [
        ...prev,
        {
          questionIndex,
          word: question.word,
          displayDefinition: question.displayDefinition,
          isMatch: question.isMatch,
          answeredCorrectly,
        },
      ]);

      if (answeredCorrectly) {
        setScore((prev) => prev + POINTS_PER_CORRECT);
      }

      setQuestionIndex((prev) => prev + 1);
    },
    [isComplete, questionIndex, questions],
  );

  const resetGame = useCallback(() => {
    setQuestions(buildQuestions());
    setQuestionIndex(0);
    setScore(0);
    setAnswerHistory([]);
  }, []);

  return {
    currentQuestion,
    score,
    questionIndex,
    isComplete,
    answerHistory,
    submitAnswer,
    resetGame,
  };
}
