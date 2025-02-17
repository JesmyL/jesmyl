import { useSearches } from '#shared/hooks/useSearches';

export const useToNewChordSearches = () => useSearches<{ newChordName: string }>();
