import { Tabs, Redirect } from "expo-router";
import { BottomNavigator } from "../../components";
import { useAuth } from "../../../contexts/AuthProvider";

const TabsLayout = () => {
  const { isLogin } = useAuth();
  
  if (!isLogin) {
    return (
      <Redirect href="/pages/auth/loginScreen" />
    )
  }

  return (
    <Tabs tabBar={(props) => <BottomNavigator {...props}/>}>
      <Tabs.Screen name="penggunaScreen" options={{ title: "Pengguna", headerShown: false }} />
      <Tabs.Screen name="riwayatScreen" options={{ title: "Riwayat", headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
