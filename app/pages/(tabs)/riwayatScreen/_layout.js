import { Stack } from "expo-router";

const RiwayatLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Riwayat",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RiwayatLayout;
