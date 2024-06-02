import { Stack } from "expo-router";
import AuthProvider from "../contexts/AuthProvider";

const StackLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="pages"
          options={{
            title: "Scan and Go",
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default StackLayout;
