import { Stack } from "expo-router";

const PenggunaLayout = () => {
  return (
    <Stack>
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
