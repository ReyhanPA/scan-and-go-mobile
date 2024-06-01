import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Scan and Go",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
