import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./pages/SplashScreen";
import { HomePage } from "./pages/HomePage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { StaffLoginPage } from "./pages/StaffLoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ForgotPassword2FAPage } from "./pages/ForgotPassword2FAPage";
import { TwoStepVerificationPage } from "./pages/TwoStepVerificationPage";
import { SetNewPasswordPage } from "./pages/SetNewPasswordPage";
import { SuccessPage } from "./pages/SuccessPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SalesReportPage } from "./pages/SalesReportPage";
import { ProfilePage } from "./pages/ProfilePage";
import { TransactionHistoryPage } from "./pages/TransactionHistoryPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { NotificationSettingsPage } from "./pages/NotificationSettingsPage";
import { PrivacySettingsPage } from "./pages/PrivacySettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: HomePage,
  },
  {
    path: "/admin-login",
    Component: AdminLoginPage,
  },
  {
    path: "/staff-login",
    Component: StaffLoginPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/forgot-password-2fa",
    Component: ForgotPassword2FAPage,
  },
  {
    path: "/two-step-verification",
    Component: TwoStepVerificationPage,
  },
  {
    path: "/set-new-password",
    Component: SetNewPasswordPage,
  },
  {
    path: "/success",
    Component: SuccessPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/sales-report",
    Component: SalesReportPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/history",
    Component: TransactionHistoryPage,
  },
  {
    path: "/notifications",
    Component: NotificationsPage,
  },
  {
    path: "/settings/notifications",
    Component: NotificationSettingsPage,
  },
  {
    path: "/settings/privacy",
    Component: PrivacySettingsPage,
  },
]);