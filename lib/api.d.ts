/**
 *  _____      _                  _      _    ____ ___
 * | ____|_  _| |_ _ __ __ _  ___| |_   / \  |  _ \_ _|
 * |  _| \ \/ / __| '__/ _` |/ __| __| / _ \ | |_) | |
 * | |___ >  <| |_| | | (_| | (__| |_ / ___ \|  __/| |
 * |_____/_/\_\\__|_|  \__,_|\___|\__/_/   \_\_|  |___|
 *
 */

type ExtractBounds = [number, number, number, number];

export interface Element {
  Bounds: ExtractBounds;
  CharBounds: ExtractBounds[];
  Page: number;
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
