import { useState, useEffect } from 'react';
import { challengeApi, Challenge } from '../api/challengeApi';

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const challengesData = await challengeApi.getAll();
      setChallenges(challengesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch challenges');
      console.error('Error fetching challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  const createChallenge = async (challenge: Omit<Challenge, '_id' | 'id'>) => {
    try {
      const newChallenge = await challengeApi.create(challenge);
      setChallenges(prev => [newChallenge, ...prev]);
      return newChallenge;
    } catch (err) {
      setError('Failed to create challenge');
      console.error('Error creating challenge:', err);
      throw err;
    }
  };

  const updateChallenge = async (id: string, updates: Partial<Challenge>) => {
    try {
      const updatedChallenge = await challengeApi.update(id, updates);
      setChallenges(prev => 
        prev.map(challenge => 
          challenge.id === id ? updatedChallenge : challenge
        )
      );
      return updatedChallenge;
    } catch (err) {
      setError('Failed to update challenge');
      console.error('Error updating challenge:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return {
    challenges,
    loading,
    error,
    refetch: fetchChallenges,
    createChallenge,
    updateChallenge
  };
};