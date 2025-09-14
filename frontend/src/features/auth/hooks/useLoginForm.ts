"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  document: z.string().length(11, "CPF deve ter 11 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof schema>;

export const useLoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      document: "",
      password: "",
    },
  });

  return methods;
};
