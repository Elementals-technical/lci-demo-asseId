import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../pages/MainLayout/MainLayout";
import { FlatForm, Player, PortalToElement } from "@threekit-tools/treble/dist";
import { ConfiguratorPage } from "../pages/ConfiguratorPage/ConfiguratorPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ConfiguratorPage />,
      },
      {
        path: "*",
        element: <ConfiguratorPage />,
      }, // fallback
    ],
  },
  { path: "/iframe", element: <>iframe</> },
  // { path: "/iframe", element: <IframePlayerPage /> },
]);
