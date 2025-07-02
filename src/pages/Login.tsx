import { useQuery } from "@tanstack/react-query";
import AuthLogo from "../components/AuthLogo";
import LoginForm from "../components/LoginForm";
import { getMe } from "../services/userAPI";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router";

function Login() {
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (
    !(data instanceof Error) &&
    (data.role.includes("employee") || data.role.includes("admin"))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="mx-auto flex flex-col gap-12 py-16 md:w-1/2 lg:my-32 lg:w-1/3">
      <div className="w-5/6">
        <AuthLogo />
      </div>
      <LoginForm />
    </main>
  );
}

export default Login;
