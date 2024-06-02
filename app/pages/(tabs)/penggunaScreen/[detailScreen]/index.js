import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text, Modal, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { TopBarDetail } from "../../../../components";
import { styled } from "nativewind";
import { router } from "expo-router";
import { useAuth } from "../../../../../contexts/AuthProvider";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import QRCode from "react-native-qrcode-svg";

const StyledTextInput = styled(TextInput);

const DetailScreen = () => {
  const route = useRoute();
  const penggunaID = route.params.penggunaID;
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [newNama, setNewNama] = useState("");
  const [newNim, setNewNim] = useState("");
  const [newPlat, setNewPlat] = useState("");
  const [newSaldo, setNewSaldo] = useState("");
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalHapusVisible, setModalHapusVisible] = useState(false);
  const { isLogin, user } = useAuth();

  const handleYa = async () => {
    setModalHapusVisible(false);
    setLoading(true);
    try {
      await auth().deleteUser(penggunaID);

      const userRef = firestore().collection("users").doc(penggunaID);
      await userRef.delete();

      router.back();
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTidak = () => {
    setModalHapusVisible(false);
  };

  const handleSaveEdit = async () => {
    setModalEditVisible(false);
    const userRef = firestore().collection("users").doc(penggunaID);
    await userRef.update({
      nama: newNama,
      nim: newNim,
      plat: newPlat,
      saldo: newSaldo
    });
    const updatedSnapshot = await userRef.get();
    setDataUser({ id: updatedSnapshot.id, ...updatedSnapshot.data() });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (user && user.uid && isLogin) {
          const userRef = firestore().collection("users").doc(penggunaID);
          const docSnapshot = await userRef.get();
          if (docSnapshot.exists) {
            const userData = { id: docSnapshot.id, ...docSnapshot.data() };
            setDataUser(userData);
            setNewNama(userData.nama);
            setNewNim(userData.nim);
            setNewPlat(userData.plat);
            setNewSaldo(userData.saldo);
          } else {
            console.error("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBarDetail />
      <ScrollView className="flex-1 h-full w-full bg-white px-4 py-4">
        <View className="flex justify-center items-center my-8">
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
            <View className="flex flex-row justify-between items-center w-full mt-12">
              <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={() => setModalEditVisible(true)}>
                <Text className="text-white text-base font-medium">Edit</Text>
              </Button>
              <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={() => setModalHapusVisible(true)}>
                <Text className="text-white text-base font-medium">Hapus</Text>
              </Button>
            </View>
            <Modal transparent={true} visible={modalEditVisible} animationType="slide" onRequestClose={() => setModalEditVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text className="text-xl font-bold text-[#4D869C] mb-4">Edit Akun</Text>
                  <View className="flex w-full justify-center">
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white mb-4"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Nama"
                      value={newNama}
                      onChangeText={(text) => setNewNama(text)}
                    />
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white mb-4"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="NIM"
                      value={newNim}
                      onChangeText={(text) => setNewNim(text)}
                    />
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white mb-4"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Plat"
                      value={newPlat}
                      onChangeText={(text) => setNewPlat(text)}
                    />
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white mb-4"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Saldo"
                      value={newSaldo}
                      onChangeText={(text) => setNewSaldo(text)}
                    />
                  </View>
                  <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={() => handleSaveEdit()}>
                    <Text className="text-white text-base font-medium">Simpan</Text>
                  </Button>
                </View>
              </View>
            </Modal>
            <Modal transparent={true} visible={modalHapusVisible} animationType="slide" onRequestClose={() => setModalHapusVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text className="text-xl font-bold text-[#4D869C] mb-4">Apakah yakin hapus akun?</Text>
                  <View className="flex flex-row w-full justify-center">
                    <TouchableOpacity className="shadow-md shadow-black" onPress={() => handleYa()} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Ya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="shadow-md shadow-black" onPress={() => handleTidak()} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Tidak</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4D869C",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  modalButtonText: {
    fontSize: 18,
    color: "white",
  },
});

export default DetailScreen;
