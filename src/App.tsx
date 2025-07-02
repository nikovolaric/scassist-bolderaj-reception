import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./app/AppLayout";
import ErrorBoundary from "./pages/ErrorBoundry";
import Spinner from "./components/Spinner";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardLayout from "./app/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Invoices from "./pages/Invoices";
import ClassUsers from "./pages/ClassUsers";
import Users from "./pages/Users";
import User from "./pages/User";
import Articles from "./pages/Articles";
import ChooseClass from "./pages/ChooseClass";
import EndPurchase from "./pages/EndPurchase";
import ChooseUserForTicket from "./pages/ChooseUserForTicket";
import Companies from "./pages/Companies";
import Company from "./pages/Company";
import Gifts from "./pages/Gifts";
import ConfirmGift from "./pages/ConfirmGift";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    loader: Spinner,
    HydrateFallback: Spinner,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "users",
            Component: Users,
          },
          {
            path: "users/:id",
            Component: User,
          },
          {
            path: "users/:id/articles",
            Component: Articles,
          },
          {
            path: "users/:id/articles/checkout",
            Component: EndPurchase,
          },
          {
            path: "users/:id/articles/checkout/:articleId",
            Component: ChooseUserForTicket,
          },
          {
            path: "users/:id/articles/:articleId",
            Component: ChooseClass,
          },
          {
            path: "classes",
            Component: Classes,
          },
          {
            path: "classes/:classId",
            Component: ClassUsers,
          },
          {
            path: "companies",
            Component: Companies,
          },
          {
            path: "companies/:id",
            Component: Company,
          },
          {
            path: "invoices",
            Component: Invoices,
          },
          {
            path: "gifts",
            Component: Gifts,
          },
          {
            path: "gifts/:id",
            Component: ConfirmGift,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
