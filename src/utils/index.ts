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

export const generateKey = async (): Promise<CryptoKey> => {
  // Generate a cryptographic key for AES-GCM encryption
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};
 
export const encryptData = async (
  data: any,
  key: CryptoKey
): Promise<string> => {
  // Convert data to JSON string
  const encodedData = new TextEncoder().encode(JSON.stringify(data));
 
  // Generate a random initialization vector (IV)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
 
  // Encrypt the data
  const encryptedContent = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );
 
  // Combine IV and encrypted data using a more compatible method
  const combinedData = new Uint8Array(iv.length + encryptedContent.byteLength);
  combinedData.set(iv, 0);
  combinedData.set(new Uint8Array(encryptedContent), iv.length);
 
  // Convert to base64 for storage
  return btoa(String.fromCharCode.apply(null, Array.from(combinedData)));
};
 
export const decryptData = async (
  encryptedBase64: string,
  key: CryptoKey
): Promise<any> => {
  try {
    // Convert base64 to Uint8Array
    const encryptedDataWithIV = new Uint8Array(
      atob(encryptedBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
 
    // Extract IV (first 12 bytes)
    const iv = encryptedDataWithIV.slice(0, 12);
    const encryptedContent = encryptedDataWithIV.slice(12);
 
    // Decrypt the data
    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedContent
    );
 
    // Convert decrypted data back to string and parse JSON
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedContent));
  } catch (error) {
    // This catch block will trigger if:
    // 1. The key is incorrect
    // 2. The data has been tampered with
    throw new Error("Failed to decrypt data.");
  }
};
