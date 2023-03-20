import {
  createElement as h,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const AnnotationContext = createContext(null);
export const useAnnotations = () => {
  const ctx = useContext(AnnotationContext);
  if (ctx === null) {
    throw new Error(`Please use useAnnotation inside of its provider.`);
  }
  return ctx;
};

const AnnotationHandlerContext = createContext(null);

export const useAnnotationHandlers = () => {
  const ctx = useContext(AnnotationHandlerContext);
  if (ctx === null) {
    throw new Error(`Please use useAnnotationHandlers inside of its provider.`);
  }
  return ctx;
};

/**
 * AnnotationProvider - A react provider for all of our annotations.
 *
 * @param {import("./annotations.js").AnnotationProviderProps} props
 */
export const AnnotationProvider = (props) => {
  const [annotations, setAnnotations] = useState({
    annotations: {},
    selectedAnnotations: {},
  });

  /** @type {import("./annotations.js").AnnotationHandlers['createAnnotation']} */
  const createAnnotation = useCallback((newAnnotation) => {
    setAnnotations((prev) => {
      return {
        ...prev,
        annotations: {
          ...prev.annotations,
          [newAnnotation.id]: newAnnotation,
        },
        selectedAnnotations: {
          [newAnnotation.id]: true,
        },
      };
    });
  }, []);

  /** @type {import("./annotations.js").AnnotationHandlers['deleteAnnotation']} */
  const deleteAnnotation = useCallback((id) => {
    setAnnotations((prev) => {
      /** @type {import("./annotations.js").AnnotationContext} */
      const newState = {
        annotations: { ...prev.annotations },
        selectedAnnotations: { ...prev.selectedAnnotations },
      };
      delete newState.annotations[id];
      delete newState.selectedAnnotations[id];
      return newState;
    });
  }, []);

  /** @type {import("./annotations.js").AnnotationHandlers['updateAnnotation']} */
  const updateAnnotation = useCallback((annotation) => {
    setAnnotations((prev) => {
      return {
        ...prev,
        annotations: {
          ...prev.annotations,
          [annotation.id]: annotation,
        },
      };
    });
  }, []);

  /** @type {import("./annotations.js").AnnotationHandlers['selectAnnotation']} */
  const selectAnnotation = useCallback((annotationId) => {
    setAnnotations((prev) => {
      return {
        ...prev,
        selectedAnnotations: {
          [annotationId]: true,
        },
      };
    });
  }, []);

  /** @type {import("./annotations.js").AnnotationHandlers['deselectAnnotation']} */
  const deselectAnnotation = useCallback((annotationId) => {
    setAnnotations((prev) => {
      const { selectedAnnotations } = prev;
      /** @type {import("./annotations.js").AnnotationContext['selectedAnnotations']} */
      const newSelectedAnnotations = {
        ...selectedAnnotations,
      };
      delete newSelectedAnnotations[annotationId];
      return {
        ...prev,
        selectedAnnotations: newSelectedAnnotations,
      };
    });
  }, []);
  const handlers = useMemo(() => {
    return {
      selectAnnotation,
      createAnnotation,
      deleteAnnotation,
      updateAnnotation,
      deselectAnnotation,
    };
  }, [
    createAnnotation,
    deleteAnnotation,
    updateAnnotation,
    selectAnnotation,
    deselectAnnotation,
  ]);
  return h(AnnotationContext.Provider, {
    // @ts-expect-error - The types are correct.
    value: annotations,
    children: h(AnnotationHandlerContext.Provider, {
      // @ts-expect-error - The types are correct.
      value: handlers,
      children: props.children,
    }),
  });
};
