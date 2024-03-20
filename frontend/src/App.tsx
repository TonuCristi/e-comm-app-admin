import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import BuildingPage from "./pages/BuildingPage";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

import GlobalStyles from "./styles/GlobalStyles";
import AuthProvider from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/buildings",
        element: <Buildings />,
      },
      {
        path: "/buildings/:buildingId",
        element: <BuildingPage />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderPage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
    </AuthProvider>
  );
}

export default App;
