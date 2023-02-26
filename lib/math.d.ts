import { ExtractResult } from "./api";

export interface Bounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Paragraph {
  id: string;
  page: number;
  text: string;
  bounds: Bounds;
}

export interface Word {
  id: string;
  page: number;
  text: string;
  bounds: Bounds;
  paragraph_id: string;
}

export interface Character {
  letter: string;
  bounds: Bounds;
  page: number;
  id: string;
  paragraph_id: string;
  word_id: string;
}

export interface AnnotContext {
  paragraphs: Paragraph[];
  words: Word[];
  characters: Character[];
}

export const areOverlapping: (a: Bounds, b: Bounds) => true;

export const analyzeElements: (api: ExtractResult) => AnnotContext;
