"use client";

import { FormProvider } from "react-hook-form";
import { LoginFormValues, useLoginForm } from "../../hooks/useLoginForm";
import { LoginPagePresenter } from "../../presenters/pages/LoginPage.presenter";
import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "../../types/api/login-api";
import { AuthFormPresenter } from "../../presenters/form/AuthForm.presenter";
import { internalLogin } from "../../services/internal/login";
import { useRouter } from "next/navigation";

export const AuthFormContainer = () => {
  const router = useRouter();
  const methods = useLoginForm();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginApi) => internalLogin(data),
    onSuccess: () => {
      console.log("Login successful");
      router.push("/appointments");
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    await mutateAsync(data);
  };

  return (
    <FormProvider {...methods}>
      <LoginPagePresenter>
        <AuthFormPresenter onSubmit={handleSubmit} isPending={isPending} />
      </LoginPagePresenter>
    </FormProvider>
  );
};
