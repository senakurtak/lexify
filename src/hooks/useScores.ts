import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  bestScore: '@lexify/bestScore',
  lastScore: '@lexify/lastScore',
  totalRounds: '@lexify/totalRounds',
  totalCorrect: '@lexify/totalCorrect',
} as const;

export interface Scores {
  bestScore: number;
  lastScore: number;
  totalRounds: number;
  totalCorrect: number;
}

const DEFAULT_SCORES: Scores = {
  bestScore: 0,
  lastScore: 0,
  totalRounds: 0,
  totalCorrect: 0,
};

async function readScores(): Promise<Scores> {
  const [bestScore, lastScore, totalRounds, totalCorrect] = await AsyncStorage.multiGet([
    KEYS.bestScore,
    KEYS.lastScore,
    KEYS.totalRounds,
    KEYS.totalCorrect,
  ]);

  return {
    bestScore: Number(bestScore[1] ?? 0),
    lastScore: Number(lastScore[1] ?? 0),
    totalRounds: Number(totalRounds[1] ?? 0),
    totalCorrect: Number(totalCorrect[1] ?? 0),
  };
}

export function useScores() {
  const [scores, setScores] = useState<Scores>(DEFAULT_SCORES);

  useEffect(() => {
    (async () => {
      try {
        const stored = await readScores();
        setScores(stored);
      } catch {
        // Storage unavailable; fall back to defaults
      }
    })();
  }, []);

  const saveRoundResult = useCallback(async (score: number, correct: number) => {
    try {
      const current = await readScores();

      const updated: Scores = {
        bestScore: Math.max(current.bestScore, score),
        lastScore: score,
        totalRounds: current.totalRounds + 1,
        totalCorrect: current.totalCorrect + correct,
      };

      await AsyncStorage.multiSet([
        [KEYS.bestScore, String(updated.bestScore)],
        [KEYS.lastScore, String(updated.lastScore)],
        [KEYS.totalRounds, String(updated.totalRounds)],
        [KEYS.totalCorrect, String(updated.totalCorrect)],
      ]);

      setScores(updated);
    } catch {
      // Persist failed; keep in-memory state unchanged
    }
  }, []);

  return { scores, saveRoundResult };
}
