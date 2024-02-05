import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./ui/RootLayout";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";

import GlobalStyles from "./styles/GlobalStyles";

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
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
    </>
  );
}

export default App;
