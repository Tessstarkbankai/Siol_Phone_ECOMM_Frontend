import { createBrowserRouter } from "react-router-dom";
import { CustomerLayout } from "./components/layout/CustomerLayout";
import { StoreHome } from "./pages/customer/Home";
import { PublicOnlyLayout } from "./components/auth/PublicOnlyLayout";
import { SignInPage } from "./pages/auth/Sign-in";
import { SignUpPage } from "./pages/auth/Sign-up";
import { ProtectedLayout } from "./components/auth/ProtectedLayout";
import { RoleGuardLayout } from "./components/auth/RoleGuardLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCoupons from "./pages/admin/Promos";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";
import AdminVideos from "./pages/admin/Videos";
import Collections from "./pages/customer/Collections";
import CollectionDetails from "./pages/customer/Collection-Details";
import CustomerOrderSuccessPage from "./pages/customer/Order-Sucess";
import AboutPage from "./pages/customer/About";
import ContactPage from "./pages/customer/Contact";
import FAQPage from "./pages/customer/FAQ";
import ShippingPolicyPage from "./pages/customer/ShippingPolicy";
import ReturnPolicyPage from "./pages/customer/ReturnPolicy";
import PrivacyPolicyPage from "./pages/customer/PrivacyPolicy";
import TermsPage from "./pages/customer/Terms";
import NotFoundPage from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <StoreHome />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicyPage />,
      },
      {
        path: "return-policy",
        element: <ReturnPolicyPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "sign-in/*",
            element: <SignInPage />,
          },
          {
            path: "sign-up/*",
            element: <SignUpPage />,
          },
          {
            path: "collections",
            element: <Collections />,
          },
          {
            path: "collection/:id",
            element: <CollectionDetails />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "order-success",
            element: <CustomerOrderSuccessPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuardLayout allow={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "products",
                element: <AdminProducts />,
              },
              {
                path: "videos",
                element: <AdminVideos />,
              },
              {
                path: "coupons",
                element: <AdminCoupons />,
              },
              {
                path: "orders",
                element: <AdminOrders />,
              },
              {
                path: "settings",
                element: <AdminSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
