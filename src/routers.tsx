import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "./models/pages/LoginPage";
import ChangePasswordPage from "./models/pages/ChangePasswordPage";
import ForgotPasswordPage from "./models/pages/ForgotPasswordPage";
import TableEmployee from "./models/components/TableEmployee";
import ResetPassword from "./models/components/ResetPassword";
import FormAddEmployee from "./models/components/FormAddEmployee";
import TableNew from "./models/components/TableNew";
import Layouts from "./layouts/Layout";

const PrivateRouter = ({ element }: { element: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{element}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Navigate to="/employee" />,
      },
      {
        path: "employee",
        element: <PrivateRouter element={<TableNew />} />,
      },
      {
        path: "add-employee",
        element: <PrivateRouter element={<FormAddEmployee />} />,
      },
      {
        path: "change-password",
        element: <PrivateRouter element={<ChangePasswordPage />} />,
      },
    ],
  },
  // {
  //   path: "layouts",
  //   element: <Layouts/>, children: [
  //     {
  //       index: true,
  //       element: <PrivateRouter element={<TableNew />} />,
  //     }
  //   ]
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
]);
