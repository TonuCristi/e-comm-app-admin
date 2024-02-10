import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./ui/RootLayout";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Building from "./pages/Building";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";

import GlobalStyles from "./styles/GlobalStyles";
import BuildingsProvider from "./context/BuildingsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        element: <Building />,
      },
      {
        path: "/orders",
        element: <Orders />,
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
    <BuildingsProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
    </BuildingsProvider>
  );
}

export default App;
