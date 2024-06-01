import { Tabs } from "expo-router";
import { BottomNavigator } from "../../components";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <BottomNavigator {...props}/>}>
      <Tabs.Screen name="penggunaScreen" options={{ title: "Pengguna", headerShown: false }} />
      <Tabs.Screen name="riwayatScreen" options={{ title: "Riwayat", headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
