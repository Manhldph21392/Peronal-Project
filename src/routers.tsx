import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./models/pages/LoginPage";
import ChangePasswordPage from "./models/pages/ChangePasswordPage";
import ForgotPasswordPage from "./models/pages/ForgotPasswordPage";
import TableEmployee from "./models/components/TableEmployee";
import ResetPassword from "./models/components/ResetPassword";
import FormAddEmployee from "./models/components/FormAddEmployee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <div>HomePage</div>,
      },
      {
        path: "employee",
        element: <TableEmployee />,
      },
      {
        path: "add-employee",
        element: <FormAddEmployee />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/auth/reset-password",
    element: <ForgotPasswordPage />,
  },
]);
