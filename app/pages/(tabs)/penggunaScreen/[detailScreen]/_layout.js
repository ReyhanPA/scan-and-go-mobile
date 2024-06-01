import { Stack } from "expo-router";

const DetailLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Detail Pengguna",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DetailLayout;
