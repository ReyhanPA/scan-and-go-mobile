import { Stack } from "expo-router";

const PenggunaLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Pengguna",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PenggunaLayout;
