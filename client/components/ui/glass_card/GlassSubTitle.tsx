import React from "react";

type GlassSubTitleProps = {
  children: React.ReactNode;
  className?: string;
  weight?: "normal" | "bold" | "light" | "semibold";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  position?: "left" | "right" | "center";
};

/**
 *  A subtitle component for glass cards.
 * @param {React} children The content to be displayed inside the subtitle.
 * @param {string} weight The font weight for the subtitle text. Options are "normal", "bold", "light", or "semibold".
 * @param {string} className Optional additional CSS classes to apply to the subtitle.
 * @param {string} size The font size for the subtitle text. Options are "sm", "md", "lg", "xl", or "2xl".
 * @returns The rendered GlassSubTitle component.
 */
export default function GlassSubTitle({
  children,
  className,
  weight = "normal",
  size = "md",
  position = "left",
}: GlassSubTitleProps) {
  const weightValue = weight ? weight : "normal";
  return (
    <h3
      className={`text${className} font-montserrat font-${weightValue} text-${size} text-dark-gray`}
    >
      {children}
    </h3>
  );
}
