export type PartOfSpeech = 'noun' | 'verb' | 'adjective';

export interface Word {
  id: string;
  word: string;
  partOfSpeech: PartOfSpeech;
  definition: string;
}

export const words: Word[] = [
  // Adjectives
  { id: 'adj-01', word: 'abundant', partOfSpeech: 'adjective', definition: 'existing in large quantities; more than enough' },
  { id: 'adj-02', word: 'arid', partOfSpeech: 'adjective', definition: 'having little or no rainfall; extremely dry' },
  { id: 'adj-03', word: 'candid', partOfSpeech: 'adjective', definition: 'truthful and straightforward; not holding back opinions' },
  { id: 'adj-04', word: 'dormant', partOfSpeech: 'adjective', definition: 'temporarily inactive but capable of becoming active' },
  { id: 'adj-05', word: 'eloquent', partOfSpeech: 'adjective', definition: 'expressing ideas clearly and effectively in speech or writing' },
  { id: 'adj-06', word: 'frugal', partOfSpeech: 'adjective', definition: 'careful not to waste money or resources' },
  { id: 'adj-07', word: 'grueling', partOfSpeech: 'adjective', definition: 'extremely demanding and exhausting' },
  { id: 'adj-08', word: 'lucid', partOfSpeech: 'adjective', definition: 'expressed clearly; easy to understand' },
  { id: 'adj-09', word: 'meticulous', partOfSpeech: 'adjective', definition: 'showing great attention to every detail' },
  { id: 'adj-10', word: 'opaque', partOfSpeech: 'adjective', definition: 'not able to be seen through; not transparent' },
  { id: 'adj-11', word: 'serene', partOfSpeech: 'adjective', definition: 'calm, peaceful, and untroubled' },

  // Verbs
  { id: 'vrb-01', word: 'allocate', partOfSpeech: 'verb', definition: 'to distribute resources or duties for a specific purpose' },
  { id: 'vrb-02', word: 'conceal', partOfSpeech: 'verb', definition: 'to keep something hidden from view or knowledge' },
  { id: 'vrb-03', word: 'diminish', partOfSpeech: 'verb', definition: 'to make or become smaller, weaker, or less significant' },
  { id: 'vrb-04', word: 'elapsed', partOfSpeech: 'verb', definition: 'of time: passed or went by' },
  { id: 'vrb-05', word: 'fluctuate', partOfSpeech: 'verb', definition: 'to rise and fall irregularly; to change continually' },
  { id: 'vrb-06', word: 'infer', partOfSpeech: 'verb', definition: 'to draw a conclusion from evidence rather than from explicit statements' },
  { id: 'vrb-07', word: 'negate', partOfSpeech: 'verb', definition: 'to cancel out the effect or validity of something' },
  { id: 'vrb-08', word: 'obscure', partOfSpeech: 'verb', definition: 'to make something difficult to see, understand, or discover' },
  { id: 'vrb-09', word: 'persist', partOfSpeech: 'verb', definition: 'to continue firmly despite obstacles or opposition' },
  { id: 'vrb-10', word: 'refute', partOfSpeech: 'verb', definition: 'to prove a statement or claim to be wrong' },
  { id: 'vrb-11', word: 'simulate', partOfSpeech: 'verb', definition: 'to imitate the appearance or conditions of something' },

  // Nouns
  { id: 'nou-01', word: 'anomaly', partOfSpeech: 'noun', definition: 'something that deviates from what is standard or expected' },
  { id: 'nou-02', word: 'catalyst', partOfSpeech: 'noun', definition: 'a person or thing that causes an event to happen more quickly' },
  { id: 'nou-03', word: 'deficit', partOfSpeech: 'noun', definition: 'the amount by which something falls short of what is needed' },
  { id: 'nou-04', word: 'equilibrium', partOfSpeech: 'noun', definition: 'a state of balance between opposing forces or factors' },
  { id: 'nou-05', word: 'faction', partOfSpeech: 'noun', definition: 'a group within a larger group that holds different views' },
  { id: 'nou-06', word: 'hierarchy', partOfSpeech: 'noun', definition: 'a system in which members are ranked according to authority or status' },
  { id: 'nou-07', word: 'incentive', partOfSpeech: 'noun', definition: 'something that motivates or encourages a particular action' },
  { id: 'nou-08', word: 'paradox', partOfSpeech: 'noun', definition: 'a statement that seems contradictory yet may be true' },
  { id: 'nou-09', word: 'remnant', partOfSpeech: 'noun', definition: 'a small remaining quantity left after the main part has been used' },
  { id: 'nou-10', word: 'threshold', partOfSpeech: 'noun', definition: 'the point at which something begins or changes; a limit or boundary' },
];
