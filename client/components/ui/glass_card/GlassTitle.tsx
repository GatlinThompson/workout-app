import { ReactNode } from "react";

type GlassTitleProps = {
  children: ReactNode;
  className?: string;
  weight?: "normal" | "bold" | "light" | "semibold";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  position?: "left" | "right" | "center";
};

/**
 *  A title component for glass cards.
 *
 * @param {React} children The content to be displayed inside the title.
 * @param {string} weight The font weight for the title text. Options are "normal", "bold", "light", or "semibold".
 * @param {string} className Optional additional CSS classes to apply to the title.
 * @param {string} size The font size for the title text. Options are "sm", "md", "lg", "xl", "2xl", "3xl", or "4xl".
 * @returns The rendered GlassTitle component.
 */
export default function GlassTitle({
  children,
  className,
  weight,
  size,
  position = "left",
}: GlassTitleProps) {
  const weightValue = weight ? weight : "normal";
  return (
    <h2
      className={`text-${position} ${className} font-montserrat font-${weightValue} text-${
        size ? size : "xl"
      }`}
    >
      {children}
    </h2>
  );
}
