import React, { useState } from "react";
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Button } from "react-native";
import { TopBar } from "../../../components";
import DatePicker from 'react-native-date-picker'
import { registerTranslation, en } from 'react-native-paper-dates';

registerTranslation('en', en);

const dataRiwayat = [
  {
    id: 1,
    plat: "D 6256 ZBQ",
    masuk: "07:00",
    keluar: "13:00",
    tanggal: "02/04/2024"
  },
  {
    id: 2,
    plat: "B 1234 ABC",
    masuk: "08:00",
    keluar: "14:00",
    tanggal: "02/04/2024"
  },
  {
    id: 3,
    plat: "C 1234 ABC",
    masuk: "09:00",
    keluar: "13:00",
    tanggal: "02/04/2024"
  }
];

const RiwayatScreen = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView className="flex-1 h-full w-full bg-white px-4 py-4">
        <Text className="text-xl font-bold text-[#4D869C] mb-4">Daftar Riwayat</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)} >
          <View className="flex flex-row justify-center items-center h-8 w-full bg-[#CDE8E5] mb-4 rounded-full shadow shadow-black">
            <Text className="text-base font-medium text-[#4D869C]">{date.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        <View className="flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF] border border-[#4D869C]">
          <View className="flex w-1/6 justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">No</Text>
          </View>
          <View className="flex-1 justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">Plat</Text>
          </View>
          <View className="flex w-[56px] justify-center items-start">
            <Text className="text-sm font-medium text-[#4D869C]">Masuk</Text>
          </View>
          <View className="flex w-[56px] justify-center items-end">
            <Text className="text-sm font-medium text-[#4D869C]">Keluar</Text>
          </View>
        </View>
        {dataRiwayat.map((riwayat, index) => (
          <View key={riwayat.id} className="flex-row justify-between w-full px-4 py-4 border-b border-b-slate-300">
            <View className="flex w-1/6 justify-center items-start">
              <Text className="text-sm font-normal">{index + 1}</Text>
            </View>
            <View className="flex-1 justify-center items-start">
              <Text className="text-sm font-normal">{riwayat.plat}</Text>
            </View>
            <View className="flex w-[56px] justify-center items-start">
              <Text className="text-sm font-normal">{riwayat.masuk}</Text>
            </View>
            <View className="flex w-[56px] justify-center items-end">
              <Text className="text-sm font-normal">{riwayat.keluar}</Text>
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

export default RiwayatScreen;
