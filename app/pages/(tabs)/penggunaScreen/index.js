import React, { useState, useCallback } from "react";
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from 'expo-router';
import { TopBar } from "../../../components";
import { IconDetail } from "../../../../assets";
import { useAuth } from "../../../../contexts/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import Spinner from 'react-native-loading-spinner-overlay';
import QRCode from "react-native-qrcode-svg";

const PenggunaScreen = () => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogin, user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (user && user.uid && isLogin) {
        const userRef = firestore().collection("users").doc(user.uid);
        const docSnapshot = await userRef.get();
        if (docSnapshot.exists) {
          setDataUser({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.error("No such document!");
        }
        const usersRef = firestore().collection("users");
        const querySnapshot = await usersRef.orderBy("nim", "asc").get();
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [user, isLogin])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} />
      </SafeAreaView>
    );
  }

  return (
    dataUser.role === "admin" ? (
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
          {data.map((pengguna, index) => (pengguna.role === "pengguna" &&
            <View key={pengguna.uid} className="flex-row justify-between w-full px-4 py-4 border-b border-b-slate-300">
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
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.navigate({pathname: "/pages/(tabs)/penggunaScreen/[detailScreen]", params: {penggunaID: pengguna.uid, penggunaNama: pengguna.nama, penggunaNIM: pengguna.nim, penggunaPlat: pengguna.plat, penggunaSaldo: pengguna.saldo, penggunaQRCode: pengguna.qrcode}})}
                >
                  <IconDetail height={32} width={32} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.container}>
        <TopBar/>
        <View className="flex h-full w-full pt-12 items-center bg-white">
          <QRCode value={dataUser.qrcode} logoSize={100} />
          <View className="flex justify-center items-start w-full my-12 px-4">
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Nama</Text>
              </View>
              <View className="w-4/6">
                <Text className="text-base font-normal">: {dataUser.nama}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">NIM</Text>
              </View>
              <View className="w-2/6">
                <Text className="text-base font-normal">: {dataUser.nim}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Plat Nomor</Text>
              </View>
              <View className="w-4/6">
                <Text className="text-base font-normal">: {dataUser.plat}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Saldo</Text>
              </View>
              <View className="w-2/6">
                <Text className="text-base font-normal">: Rp{dataUser.saldo},-</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default PenggunaScreen;
