import { createElement as h } from "react";
import { Rnd } from "react-rnd";

/**
 * MovableBox - A resizable box component that can serve as the basis
 * of further annotations.
 *
 * @param {import("./movableBox.js").MovableBoxProps} props
 */
export const MovableBox = (props) => {
  const { additionalCss, additionalChildren, divRef, ...rndProps } = props;
  return h(Rnd, {
    style: {
      zIndex: 2,
      ...(additionalCss || {}),
    },
    ...rndProps,
    children: h("div", {
      ref: divRef,
      style: { position: "relative", width: "100%", height: "100%" },
      children: [
        additionalChildren,
        h("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
          },
          children: [
            h("div", {
              style: {
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              },
              children: [
                h("div", {
                  style: {
                    backgroundColor: "white",
                    width: "10px",
                    height: "10px",
                    border: "2px solid black",
                    borderRadius: "3px",
                    marginTop: "-3px",
                    marginLeft: "-3px",
                  },
                }),
                h("div", {
                  style: {
                    backgroundColor: "white",
                    width: "10px",
                    height: "10px",
                    border: "2px solid black",
                    borderRadius: "3px",
                    marginTop: "-3px",
                    marginRight: "-3px",
                  },
                }),
              ],
            }),
            h("div", {
              style: {
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              },
              children: [
                h("div", {
                  style: {
                    backgroundColor: "white",
                    width: "10px",
                    height: "10px",
                    border: "2px solid black",
                    borderRadius: "3px",
                    marginBottom: "-3px",
                    marginLeft: "-3px",
                  },
                }),
                h("div", {
                  style: {
                    backgroundColor: "white",
                    width: "10px",
                    height: "10px",
                    border: "2px solid black",
                    borderRadius: "3px",
                    marginBottom: "-3px",
                    marginRight: "-3px",
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
