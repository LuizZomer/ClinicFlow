export const Spinner = () => {
  return (
    <svg viewBox="25 25 50 50" className="w-14 animate-rotate4 origin-center">
      <circle
        cx="50"
        cy="50"
        r="20"
        className="fill-none stroke-blue-600 stroke-[2] stroke-linecap-round animate-dash4"
      />
    </svg>
  );
};
