import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { getMe } from "../services/userAPI";
import { useAppDispatch } from "./hooks";
import { clearCart } from "../features/articles/slices/cartSlice";
import { getCRR } from "../services/cashregisterAPI";

function DashboardLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [{ data, isPending }, { data: cashRegisterData }] = useQueries({
    queries: [
      {
        queryKey: ["me"],
        queryFn: getMe,
      },
      {
        queryKey: ["CRR"],
        queryFn: getCRR,
      },
    ],
  });

  useEffect(
    function () {
      if (
        !pathname.startsWith("/dashboard/users") ||
        pathname === "/dashboard/users"
      ) {
        dispatch(clearCart());
      }

      if (cashRegisterData instanceof Error && pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    },
    [pathname, cashRegisterData],
  );

  if (isPending) {
    return <Spinner />;
  }

  if (data instanceof Error) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export default DashboardLayout;
