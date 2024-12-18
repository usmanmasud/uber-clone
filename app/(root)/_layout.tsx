import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <StatusBar style="auto" />
    </Stack>
  );
}
