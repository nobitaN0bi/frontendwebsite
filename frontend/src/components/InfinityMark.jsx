export const InfinityMark = ({ className = '', title = 'Acoord infinity mark', testId }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    aria-label={title}
    data-testid={testId}
  >
    <path
      d="M8 8C4 8 4 16 8 16c4 0 4-8 8-8s4 8 0 8-4-8-8-8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);