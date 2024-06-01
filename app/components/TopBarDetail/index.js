import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconBack } from "../../../assets";
import { router } from "expo-router";

const TopBarDetail = () => {
  return (
    <View className="flex flex-row items-center justify-start h-14 w-full px-4 bg-[#7AB2B2] border-b border-b-slate-300">
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
        <IconBack />
      </TouchableOpacity>
      <Text className="text-lg font-semibold text-white">Detail Pengguna</Text>
    </View>
  );
};

export default TopBarDetail;
