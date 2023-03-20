import React from "react";
import { Bounds } from "../math/math.js";

export interface Annotation extends Bounds {
  id: string;
  page: number;
  label: string;
}

export interface UIAnnotation extends Annotation {
  backgroundColor: string;
  border: string;
}

type AnnotationSet = Record<string, UIAnnotation>;

export interface AnnotationContext {
  annotations: AnnotationSet;
  selectedAnnotations: Record<string, boolean>;
}

export interface AnnotationHandlers {
  createAnnotation: (annotation: UIAnnotation) => void;
  updateAnnotation: (annotation: UIAnnotation) => void;
  deleteAnnotation: (id: string) => void;
  selectAnnotation: (id: string) => void;
  deselectAnnotation: (id: string) => void;
}

export declare const useAnnotations: () => AnnotationContext;

export declare const useAnnotationHandlers: () => AnnotationHandlers;

interface AnnotationProviderProps {
  children: React.ReactNode;
}

export declare const AnnotationProvider: (
  props: AnnotationProviderProps
) => JSX.Element;
