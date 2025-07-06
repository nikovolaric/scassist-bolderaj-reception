import { Suspense, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Navigate, Outlet, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userAPI";
import { useAppDispatch } from "./hooks";
import { clearCart } from "../features/articles/slices/cartSlice";

function DashboardLayout() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(
    function () {
      if (
        !pathname.startsWith("/dashboard/users") ||
        pathname === "/dashboard/users"
      ) {
        dispatch(clearCart());
      }
    },
    [pathname],
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
