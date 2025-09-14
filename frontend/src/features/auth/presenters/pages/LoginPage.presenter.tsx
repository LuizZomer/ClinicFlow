"use client";

import Image from "next/image";

export const LoginPagePresenter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[40%] flex justify-center items-center">
        <div className="flex flex-col w-[50%] gap-8 h-full justify-center">
          <div className="flex flex-col">
            <h1 className="text-gray-500 text-center">
              Bem-vindo ao ClinicFlow
            </h1>
          </div>
          {children}
        </div>
      </div>
      <div className="w-[60%] relative">
        <Image
          src="/bg/loginBg.jpg"
          alt="Logo"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
