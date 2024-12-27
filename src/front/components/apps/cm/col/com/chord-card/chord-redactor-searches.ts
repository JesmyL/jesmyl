import { useSearches } from 'front/complect/useSearches';

export const useToNewChordSearches = () => useSearches<{ newChordName: string }>();
