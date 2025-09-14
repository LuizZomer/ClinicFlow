import { AuthProvider } from "./auth-provider";
import { QueryClientConfigProvider } from "./query-client.provider";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientConfigProvider>
  );
};
