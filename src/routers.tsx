import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "./models/pages/LoginPage";
import ChangePasswordPage from "./models/pages/ChangePasswordPage";
import ForgotPasswordPage from "./models/pages/ForgotPasswordPage";
import ResetPassword from "./models/components/ResetPassword";
import Layouts from "./layouts/Layout";
import CreateAndUpdateEmployeePage from "./models/pages/CreateAndUpdateEmployeePage";
import EmployeePage from "./models/pages/EmployeePage";

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
        element: <PrivateRouter element={<EmployeePage />} />,
      },
      {
        path: "add-or-update-employee/:id",
        element: <PrivateRouter element={<CreateAndUpdateEmployeePage />} />,
      },
      {
        path: "add-or-update-employee",
        element: <PrivateRouter element={<CreateAndUpdateEmployeePage />} />,
      },
      {
        path: "change-password",
        element: <PrivateRouter element={<ChangePasswordPage />} />,
      },
    ],
  },

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
