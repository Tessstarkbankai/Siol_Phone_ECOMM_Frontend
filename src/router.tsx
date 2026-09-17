import { createBrowserRouter, Navigate } from "react-router-dom";
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
import AdminVendors from "./pages/admin/Vendors";
import AdminModeration from "./pages/admin/Moderation";
import AdminPayouts from "./pages/admin/Payouts";
import Collections from "./pages/customer/Collections";
import CollectionDetails from "./pages/customer/Collection-Details";
import CustomerOrderSuccessPage from "./pages/customer/Order-Sucess";
import BecomeSellerPage from "./pages/customer/BecomeSeller";
import StorefrontPage from "./pages/customer/Storefront";
import VendorLayout from "./components/layout/VendorLayout";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorOrders from "./pages/vendor/Orders";
import VendorPayouts from "./pages/vendor/Payouts";
import VendorProfile from "./pages/vendor/Profile";
import AboutPage from "./pages/customer/About";
import ContactPage from "./pages/customer/Contact";
import FAQPage from "./pages/customer/FAQ";
import SupportPage from "./pages/customer/Support";
import ShippingPolicyPage from "./pages/customer/ShippingPolicy";
import ReturnPolicyPage from "./pages/customer/ReturnPolicy";
import PrivacyPolicyPage from "./pages/customer/PrivacyPolicy";
import TermsPage from "./pages/customer/Terms";
import NotFoundPage from "./pages/NotFound";

import { isMultiVendorEnabled } from "./config/features";
import BecomeDistributorPage from "./pages/customer/BecomeDistributor";
import AdminDistributorsPage from "./pages/admin/Distributors";

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
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "customer-service",
        element: <Navigate to="/support" replace />,
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
        path: "become-distributor",
        element: <BecomeDistributorPage />,
      },
      ...(isMultiVendorEnabled()
        ? [
            {
              path: "become-seller",
              element: <BecomeSellerPage />,
            },
            {
              path: "store/:slug",
              element: <StorefrontPage />,
            },
          ]
        : []),
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
          {
            path: "collections/:id",
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
                path: "distributors",
                element: <AdminDistributorsPage />,
              },
              ...(isMultiVendorEnabled()
                ? [
                    {
                      path: "moderation",
                      element: <AdminModeration />,
                    },
                    {
                      path: "vendors",
                      element: <AdminVendors />,
                    },
                    {
                      path: "payouts",
                      element: <AdminPayouts />,
                    },
                  ]
                : []),
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
      ...(isMultiVendorEnabled()
        ? [
            {
              element: <RoleGuardLayout allow={["vendor", "admin"]} />,
              children: [
                {
                  path: "/vendor",
                  element: <VendorLayout />,
                  children: [
                    {
                      index: true,
                      element: <VendorDashboard />,
                    },
                    {
                      path: "products",
                      element: <VendorProducts />,
                    },
                    {
                      path: "orders",
                      element: <VendorOrders />,
                    },
                    {
                      path: "payouts",
                      element: <VendorPayouts />,
                    },
                    {
                      path: "profile",
                      element: <VendorProfile />,
                    },
                  ],
                },
              ],
            },
          ]
        : []),
    ],
  },
]);
