import React, { CSSProperties } from "react";
import { Props as RndProps } from "react-rnd";

export interface MovableBoxProps extends RndProps {
  additionalCss?: CSSProperties;
  additionalChildren?: React.ReactNode;
  divRef?: React.MutableRefObject<HTMLDivElement | null>;
}
/**
 * A resizable box component that can serve as the basis of further annotations.
 */
export declare const MovableBox: (props: MovableBoxProps) => JSX.Element;
