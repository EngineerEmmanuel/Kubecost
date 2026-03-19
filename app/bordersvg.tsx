export default function BorderSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        pathLength="1"
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx="7.25"
      />
    </svg>
  );
}