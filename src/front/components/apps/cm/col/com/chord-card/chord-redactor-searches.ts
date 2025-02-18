import { useSearches } from 'front/08-shared/lib/hooks/useSearches';

export const useToNewChordSearches = () => useSearches<{ newChordName: string }>();
