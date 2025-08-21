import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../pages/MainLayout/MainLayout";
import { FlatForm, Player, PortalToElement } from "@threekit-tools/treble/dist";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <div className="tk-treble-player">
              <Player />
            </div>
            <PortalToElement to="tk-treble-form" strict={true}>
              <FlatForm />
            </PortalToElement>
          </>
        ),
      },
      {
        path: "*",
        element: (
          <>
            <div className="tk-treble-player">
              <Player />
            </div>
            <PortalToElement to="tk-treble-form" strict={true}>
              <FlatForm />
            </PortalToElement>
          </>
        ),
      }, // fallback
    ],
  },
  { path: "/iframe", element: <>iframe</> },
  // { path: "/iframe", element: <IframePlayerPage /> },
]);
