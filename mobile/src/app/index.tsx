import { Redirect, useRootNavigationState } from "expo-router";

export default function Index() {
  const navigationState = useRootNavigationState();

  return <>{navigationState?.key ? <Redirect href="/home" /> : null}</>;
}
