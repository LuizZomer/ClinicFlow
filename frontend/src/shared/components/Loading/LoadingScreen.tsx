import { Spinner } from "./Spinner";

export const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-white/10">
      <Spinner />
    </div>
  );
};
