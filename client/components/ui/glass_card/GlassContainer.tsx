import styles from "./GlassContainer.module.css";

type GlassContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * A container component that provides a glass card effect
 * @param {React} children The content to be displayed inside the glass container.
 * @param {string} className Optional additional CSS classes to apply to the container.
 * @returns The rendered GlassContainer component.
 */
export default function GlassContainer({
  children,
  className,
  style,
}: GlassContainerProps) {
  return (
    <div
      className={`${styles["glass-card"]} w-full rounded-lg md:p-8 p-3 pb-8  ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
