import React from "react";
import { Bounds } from "../math/math.js";

export declare const useCreateAnnotationFromBounds: (
  page: number
) => (bounds: Bounds) => void;

export interface CreationBounds {
  top: number;
  left: number;
  movedTop: number;
  movedLeft: number;
}

export interface CreationFinalCSS extends Bounds {
  transform: string;
  transformOrigin: string;
}

interface Token {
  id: string;
  bounds: Bounds;
  page: number;
  [x: string]: any;
}

interface CreateAnnotationLayerProps {
  pdfContainer: React.MutableRefObject<HTMLDivElement>;
  onCreateAnnotation: (bounds: Bounds) => void | Promise<void>;
  tokens: Token[];
  tokenBorder?: string;
  tokenBackgroundColor?: string;
  selectorBorder?: string;
  selectorBackgroundColor?: string;
  style?: React.CSSProperties;
}

export declare const CreateAnnotationLayer: (
  props: CreateAnnotationLayerProps
) => JSX.Element;
