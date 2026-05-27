import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppLoadingScreen } from "@/components/AppLoadingScreen";
import { ToastBanner } from "@/components/ToastBanner";
import { RootNavigator } from "@/navigation/RootNavigator";
import { AppStateProvider, useAppState } from "@/state/AppState";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <AppShell />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const [isBooting, setIsBooting] = useState(true);
  const { clearToast, toast } = useAppState();

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(clearToast, 2600);
    return () => clearTimeout(timer);
  }, [clearToast, toast]);

  if (isBooting) {
    return <AppLoadingScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
      {toast ? <ToastBanner message={toast.message} tone={toast.tone} /> : null}
    </>
  );
}
