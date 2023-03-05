import {
  Heading as AdobeHeading,
  HeadingProps,
  Text as AdobeText,
  TextProps,
} from "@adobe/react-spectrum";
import localFont from "next/font/local";

const adobeSerif = localFont({
  src: [
    {
      path: "./sourceSerif/SourceSerifPro-Light.ttf",
      weight: "200",
    },
    {
      path: "./sourceSerif/SourceSerifPro-Regular.ttf",
      weight: "400",
    },
    {
      path: "./sourceSerif/SourceSerifPro-Bold.ttf",
      weight: "900",
    },
  ],
});

const adobeClean = localFont({
  src: [
    { path: "./adobeClean/AdobeClean-Light.ttf", weight: "200" },
    { path: "./adobeClean/AdobeClean-Regular.ttf", weight: "400" },
    { path: "./adobeClean/AdobeClean-Bold.ttf", weight: "900" },
  ],
});

export const Heading = (props: HeadingProps) => {
  return <AdobeHeading UNSAFE_className={adobeSerif.className} {...props} />;
};

export const Text = (props: TextProps) => {
  return <AdobeText UNSAFE_className={adobeClean.className} {...props} />;
};
