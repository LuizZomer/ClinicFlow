"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Lock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { LoginFormValues } from "../../hooks/useLoginForm";
import { maskString, unmaskString } from "@/shared/utils/maskString";

interface AuthFormPresenterProps {
  onSubmit: (data: LoginFormValues) => void;
  isPending: boolean;
}

export const AuthFormPresenter = ({
  onSubmit,
  isPending,
}: AuthFormPresenterProps) => {
  const methods = useFormContext<LoginFormValues>();
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending} className="flex flex-col gap-4">
          <FormField
            name="document"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu documento"
                    {...field}
                    value={maskString(field.value, "cpf")}
                    onChange={(e) => {
                      const rawValue = unmaskString(e.target.value).slice(
                        0,
                        11
                      );

                      field.onChange(rawValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full">
            <Button type="submit" variant="default" className="w-full">
              <Lock />
              {isPending ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
