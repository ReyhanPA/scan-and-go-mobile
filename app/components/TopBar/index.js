import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconLogo } from "../../../assets";
import { router } from "expo-router";
import { useAuth } from "../../../contexts/AuthProvider";

const TopBar = () => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  }

  return (
    <View className="flex flex-row items-center justify-between h-14 w-full px-4 bg-[#7AB2B2] border-b border-b-slate-300">
      <IconLogo height={28} width={28} />
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <View className="flex justify-center items-center w-24 h-8 rounded-full border border-white">
          <Text className="text-white font-normal text-base align-middle">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
