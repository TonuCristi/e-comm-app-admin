import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import BuildingPage from "./pages/BuildingPage";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import Users from "./pages/Users";

import GlobalStyles from "./styles/GlobalStyles";
import BuildingsProvider from "./context/BuildingsContext";
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
      <BuildingsProvider>
        <RouterProvider router={router} />
        <GlobalStyles />
      </BuildingsProvider>
    </AuthProvider>
  );
}

export default App;
