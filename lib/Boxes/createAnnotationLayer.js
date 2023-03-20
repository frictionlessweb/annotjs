// eslint-disable-next-line
/* @ts-ignore */
import React from "react";
import { createElement as h } from "react";
import { areOverlapping, boxContaining } from "../math/math.js";
import { useAnnotationHandlers } from "../Annotations/annotations.js";
import { useDocument } from "../context/context.js";

const DEFAULT_TOKEN_BORDER = "1px solid green";
const DEFAULT_TOKEN_BACKGROUND_COLOR = "rgba(63, 195, 128, 0.5)";
const DEFAULT_SELECTOR_BORDER = "1px solid blue";
const DEFAULT_SELECTOR_BACKGROUND_COLOR = "rgba(205, 209, 228, 0.5)";

/**
 * translateCreationBoundsToInProgressCSS.
 *
 * @param {import("./createAnnotationLayer.js").CreationBounds | null} bounds
 */
export const translateCreationBoundsToInProgressCSS = (bounds) => {
  if (bounds === null) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      transform: "none",
      transformOrigin: "top left",
    };
  }
  const { top, movedTop, left, movedLeft } = bounds;
  // Calculate the distances between the new positions and the original
  // creation point.
  const height = movedTop - top;
  const width = movedLeft - left;

  // When the distances are negative, we have to flip the div 180 degrees,
  // which we can accomplish via a CSS transform.
  const flipY = width < 0 ? -180 : 0;
  let flipX = height < 0 ? -180 : 0;

  // Work around a very strange bug in Safari where negative transform values
  // cause the DOM to appear incorrect. -180 is the same thing as 540, but this
  // makes Safari happy.
  if (flipX === -180 && flipY === 0) {
    flipX = 540;
  }
  return {
    top,
    left,
    width: Math.abs(width),
    height: Math.abs(height),
    transform: `rotateY(${flipY}deg) rotateX(${flipX}deg)`,
    transformOrigin: "top left",
  };
};

/**
 * useCreateAnnotationFromBounds.
 *
 * @param {number} page
 */
export const useCreateAnnotationFromBounds = (page) => {
  const { createAnnotation } = useAnnotationHandlers();
  const createAnnotationFromBounds = React.useCallback(
    // @ts-expect-error - The type is Bounds.
    (bounds) => {
      createAnnotation({
        ...bounds,
        id: JSON.stringify(bounds),
        page: page,
        backgroundColor: DEFAULT_SELECTOR_BACKGROUND_COLOR,
        border: DEFAULT_SELECTOR_BORDER,
        label: "",
      });
    },
    [page, createAnnotation]
  );
  return createAnnotationFromBounds;
};

export const translateCreationBoundsToFinalCoordinates = (bounds) => {
  if (bounds === null) return { top: 0, left: 0, width: 0, height: 0 };
  const { top, movedTop, left, movedLeft } = bounds;
  // Calculate the final width/height of the div.
  const height = Math.abs(movedTop - top);
  const width = Math.abs(movedLeft - left);
  // Determine the *real* top and left of the div by finding the smaller values.
  const realTop = Math.min(top, movedTop);
  const realLeft = Math.min(left, movedLeft);
  return {
    top: realTop,
    left: realLeft,
    height,
    width,
  };
};

/**
 * TODO: Work out an elegant way of testing the code in this module. I'm
 * not sure how to check that these event handlers are behaving properly
 * besides literally *trying them out* on a web page.
 */
const useCreateAnnotation = (config) => {
  const { tokens, div, onCreateAnnotation } = config;
  const [annotationState, setAnnotationState] = React.useState({
    creationBounds: null,
  });
  const getMovedPositions = React.useCallback(
    (e) => {
      if (!div.current) return { movedTop: 0, movedLeft: 0 };
      const movedTop = e.pageY - div.current.offsetTop + div.current.scrollTop;
      const movedLeft =
        e.pageX - div.current.offsetLeft + div.current.scrollLeft;
      return { movedTop, movedLeft };
    },
    [div]
  );
  const onMouseDown = React.useCallback(
    (e) => {
      setAnnotationState((prev) => {
        const moved = getMovedPositions(e);
        const newBounds = {
          movedTop: moved.movedTop,
          movedLeft: moved.movedLeft,
          top: moved.movedTop,
          left: moved.movedLeft,
        };
        return {
          ...prev,
          creationBounds: newBounds,
        };
      });
    },
    [getMovedPositions]
  );
  const onMouseMove = React.useCallback(
    (e) => {
      setAnnotationState((prev) => {
        const { creationBounds: prevBounds } = prev;
        if (prevBounds === null) return prev;
        const moved = getMovedPositions(e);
        const newBounds = {
          top: prevBounds.top,
          left: prevBounds.left,
          movedTop: moved.movedTop,
          movedLeft: moved.movedLeft,
        };
        return {
          ...prev,
          creationBounds: newBounds,
        };
      });
    },
    [getMovedPositions]
  );
  const onMouseUp = React.useCallback(() => {
    setAnnotationState((prev) => {
      const finalCoordinates = translateCreationBoundsToFinalCoordinates(
        prev.creationBounds
      );
      const overlappingTokenBounds = tokens
        .filter((token) => {
          return areOverlapping(finalCoordinates, token.bounds);
        })
        .map((token) => token.bounds);
      if (overlappingTokenBounds.length > 0) {
        const finalBox = boxContaining(overlappingTokenBounds);
        onCreateAnnotation(finalBox);
      }
      return {
        ...prev,
        creationBounds: null,
      };
    });
  }, [tokens, onCreateAnnotation]);
  const onMouseLeave = React.useCallback(() => {
    setAnnotationState((prev) => {
      return {
        ...prev,
        creationBounds: null,
      };
    });
  }, []);
  return { onMouseUp, onMouseLeave, onMouseDown, onMouseMove, annotationState };
};

/**
 * CreateAnnotationLayer.
 *
 * @param {import("./createAnnotationLayer.js").CreateAnnotationLayerProps} props
 */
export const CreateAnnotationLayer = (props) => {
  const {
    style,
    tokens,
    pdfContainer,
    onCreateAnnotation,
    tokenBorder,
    tokenBackgroundColor,
    selectorBorder,
    selectorBackgroundColor,
  } = props;
  const { onMouseUp, onMouseMove, onMouseDown, onMouseLeave, annotationState } =
    useCreateAnnotation({ div: pdfContainer, onCreateAnnotation, tokens });
  const {
    documentContext: { pages },
    currentPage,
  } = useDocument();
  const width = Math.max(...pages.map((page) => page.width));
  const height = Math.max(...pages.map((page) => page.height));
  return h("div", {
    style: {
      position: "absolute",
      zIndex: 4,
      cursor: "crosshair",
      width,
      height,
      ...(style || {}),
    },
    onMouseUp: onMouseUp,
    onMouseMove: onMouseMove,
    onMouseDown: onMouseDown,
    onMouseLeave: onMouseLeave,
    children: [
      h("div", {
        style: {
          position: "absolute",
          ...translateCreationBoundsToInProgressCSS(
            annotationState.creationBounds
          ),
          backgroundColor:
            selectorBackgroundColor || DEFAULT_SELECTOR_BACKGROUND_COLOR,
          border: annotationState.creationBounds
            ? selectorBorder || DEFAULT_SELECTOR_BORDER
            : "none",
        },
      }),
      tokens
        .filter((token) => {
          return (
            token.page === currentPage - 1 &&
            areOverlapping(
              translateCreationBoundsToFinalCoordinates(
                annotationState.creationBounds
              ),
              token.bounds
            )
          );
        })
        .map((token) => {
          return h("div", {
            style: {
              position: "absolute",
              ...token.bounds,
              border: tokenBorder || DEFAULT_TOKEN_BORDER,
              backgroundColor:
                tokenBackgroundColor || DEFAULT_TOKEN_BACKGROUND_COLOR,
            },
          });
        }),
    ],
  });
};
