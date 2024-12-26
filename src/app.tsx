import React, {
  useState,
  Suspense,
  lazy,
  startTransition,
  useEffect,
} from "react";
import "./i18n";
import "./styles/index.css";
import { ConfigProvider, theme, Layout } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Spinner from "./component/spinner";
import ToggleSwitch from "./component/toggle/toggle-theme";
import { THEME_PREFERENCE, openNotificationWithIcon, lazyRetry } from "./utils";

const { Content } = Layout;

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
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem(
        THEME_PREFERENCE.THEME_KEY,
        THEME_PREFERENCE.DARK_MODE
      );
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem(
        THEME_PREFERENCE.THEME_KEY,
        THEME_PREFERENCE.LIGHT_MODE
      );
    }
  }, [isDarkMode]);

  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorBgContainer: isDarkMode ? "#141414" : "#ffffff",
      colorPrimary: "#1890ff",
    },
    components: {
      Layout: {
        bodyBg: isDarkMode ? "#141414" : "#ffffff",
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <Content className="main-content">
          <ToggleSwitch
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <RouterProvider router={router} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
