import styles from "./GrayGlassContainer.module.css";

type GrayGlassContainerProps = {
  children: React.ReactNode;
};

/**
 * A container component that provides a gray glass card effect
 *
 * @param {React.ReactNode} children The content to be displayed inside the gray glass container.
 * @returns The rendered GrayGlassContainer component.
 */

export default function GrayGlassContainer({
  children,
}: GrayGlassContainerProps) {
  return (
    <div
      className={`${styles["gray-glass-card"]} p-2 w-full rounded-md shadow-2xl`}
    >
      {children}
    </div>
  );
}
