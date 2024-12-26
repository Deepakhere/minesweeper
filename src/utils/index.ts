import React from "react";
import { notification } from "antd";

export * from "./enums";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotificationWithIcon = (
  type: NotificationType,
  message: string
) => {
  notification[type]({
    message: message,
    duration: 3,
    placement: "top",
  });
};

export const lazyRetry = (
  componentImport: () => Promise<any>
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      sessionStorage.getItem("retry-lazy-refreshed") || "false"
    );

    // try to import the component
    componentImport()
      .then((component: any) => {
        sessionStorage.setItem("retry-lazy-refreshed", "false"); // success so reset the refresh
        resolve(component);
      })
      .catch((error: any) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          sessionStorage.setItem("retry-lazy-refreshed", "true"); // we are now going to refresh
          return "something went wrong..."; // refresh the page
        }
        reject(error); // Default error behaviour as already tried refresh
      });
  });
};

export class ErrorBoundary extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      return window.location.reload();
    }
    //@ts-ignore
    return this.props.children;
  }
}
