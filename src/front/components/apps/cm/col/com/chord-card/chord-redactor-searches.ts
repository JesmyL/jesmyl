import { useSearches } from '#shared/lib/+hooks/useSearches';

export const useToNewChordSearches = () => useSearches<{ newChordName: string }>();
