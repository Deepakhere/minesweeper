import React, {
  useState,
  Suspense,
  lazy,
  startTransition,
  useEffect,
} from "react";
import "./i18n";
import "./styles/index.css";
import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Spinner from "./component/spinner";
import ToggleSwitch from "./component/toggle/toggle-theme";
import { THEME_PREFERENCE, openNotificationWithIcon, lazyRetry } from "./utils";

const MinesweeperHomePage = lazy(() =>
  lazyRetry(() => import("./pages/minesweeper-home"))
);

const MinesweeperGamePage = lazy(() =>
  lazyRetry(() => import("./pages/minesweeper-game"))
);

const CustomPage = lazy(() => lazyRetry(() => import("./pages/custom-page")));

const router = createBrowserRouter([
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

const App = () => {
  useEffect(() => {
    window.addEventListener("offline", () => {
      openNotificationWithIcon(
        "error",
        "Please check your network connection and try again."
      );
    });
  }, []);

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(THEME_PREFERENCE.THEME_KEY);
    if (storedTheme) {
      return storedTheme === THEME_PREFERENCE.DARK_MODE;
    }
    return true;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  const toggleDarkMode = (checked: boolean) => {
    startTransition(() => {
      setIsDarkMode(checked);
      localStorage.setItem(
        THEME_PREFERENCE.THEME_KEY,
        checked ? THEME_PREFERENCE.DARK_MODE : THEME_PREFERENCE.LIGHT_MODE
      );
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem(
        THEME_PREFERENCE.THEME_KEY,
        THEME_PREFERENCE.DARK_MODE
      );
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem(
        THEME_PREFERENCE.THEME_KEY,
        THEME_PREFERENCE.LIGHT_MODE
      );
    }
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="app">
        <ToggleSwitch isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <RouterProvider router={router} />
        </main>
      </div>
    </ConfigProvider>
  );
};

export default App;
