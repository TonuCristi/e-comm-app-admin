import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./ui/RootLayout";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Building from "./pages/Building";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/Orders";

import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        children: [
          {
            path: "/buildings/:buildingId",
            element: <Building />,
          },
        ],
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
