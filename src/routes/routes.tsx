import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { lazyRetry } from "../utils";
import Spinner from "../component/spinner";

const MinesweeperHomePage = lazy(() =>
  lazyRetry(() => import("../pages/minesweeper-home"))
);

const MinesweeperGamePage = lazy(() =>
  lazyRetry(() => import("../pages/minesweeper-game"))
);

const CustomPage = lazy(() => lazyRetry(() => import("../pages/custom-page")));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <MinesweeperHomePage />
      </Suspense>
    ),
  },
  {
    path: "/game",
    element: (
      <Suspense fallback={<Spinner />}>
        <MinesweeperGamePage />
      </Suspense>
    ),
  },
  {
    path: "/custom-page",
    element: (
      <Suspense fallback={<Spinner />}>
        <CustomPage />
      </Suspense>
    ),
  },
]);

export default Router;
