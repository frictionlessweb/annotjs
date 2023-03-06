import { Bounds } from "../math/math.js";

type ExtractBounds = [number, number, number, number];

export interface Element {
  Bounds?: ExtractBounds;
  CharBounds?: ExtractBounds[];
  Page?: number;
  Text?: string;
  Kids?: Element[];
}

export interface Page {
  height: number;
  width: number;
  page_number: number;
}

export interface ExtractResult {
  elements: Element[];
  pages: Page[];
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

export const groupCharactersIntoWordGroups: (
  characters: Character[]
) => Character[][];
export const analyzeElements: (api: ExtractResult) => AnnotContext;
export const fourNumbersToBounds: (nums: ExtractBounds, page: Page) => Bounds;
