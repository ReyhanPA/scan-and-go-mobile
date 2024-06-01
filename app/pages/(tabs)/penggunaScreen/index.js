import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TopBar } from "../../../components";
import { IconDetail } from "../../../../assets";

const dataPengguna = [
  {
    id: 1,
    nim: "18221161",
    plat: "D 6256 ZBQ"
  },
  {
    id: 2,
    nim: "18221162",
    plat: "B 1234 ABC"
  },
  {
    id: 3,
    nim: "18221163",
    plat: "C 1234 ABC"
  }
]

const PenggunaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar/>
      <ScrollView className="flex-1 h-full w-full bg-white px-4 py-4">
        <Text className="text-xl font-bold text-[#4D869C] mb-4">Daftar Pengguna</Text>
        <View className="flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF] border border-[#4D869C]">
          <View className="flex w-1/6 justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">No</Text>
          </View>
          <View className="flex-1 justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">NIM</Text>
          </View>
          <View className="flex-1 justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">Plat</Text>
          </View>
          <View className="flex w-1/6 justify-center items-end">
            <Text className="text-sm font-medium text-[#4D869C]">Detail</Text>
          </View>
        </View>
        {dataPengguna.map((pengguna, index) => (
          <View key={pengguna.id} className="flex-row justify-between w-full px-4 py-4 border-b border-b-slate-300">
            <View className="flex w-1/6 justify-center items-start">
              <Text className="text-sm font-normal">{index + 1}</Text>
            </View>
            <View className="flex-1 justify-center items-start">
              <Text className="text-sm font-normal">{pengguna.nim}</Text>
            </View>
            <View className="flex-1 justify-center items-start">
              <Text className="text-sm font-normal">{pengguna.plat}</Text>
            </View>
            <View className="flex w-1/6 justify-center items-end">
              <TouchableOpacity activeOpacity={0.7}>
                <IconDetail height={32} width={32} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default PenggunaScreen;
