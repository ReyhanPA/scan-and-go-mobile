import React, { useState } from "react";
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView, Text, Modal, TouchableOpacity } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { TopBarDetail } from "../../../../components";
import { styled } from "nativewind";
import { router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";

const StyledTextInput = styled(TextInput);
const StyledHelperText = styled(HelperText);

const DetailScreen = () => {
  const route = useRoute();
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalHapusVisible, setModalHapusVisible] = useState(false);

  const penggunaNama = route.params.penggunaNama;
  const penggunaNIM = route.params.penggunaNIM;
  const penggunaPlat = route.params.penggunaPlat;
  const penggunaSaldo = route.params.penggunaSaldo;

  const handleYa = () => {
    setModalHapusVisible(false);
  };

  const handleTidak = () => {
    setModalHapusVisible(false);
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const { signIn } = useAuth();

  const validate = () => {
    let newErrors = {
      nama: "",
      nim: "",
      plat: "",
      email: "",
      password: "",
    };

    return newErrors;
  };

  const handleSaveEdit = () => {
    const findErrors = validate();
    if (Object.values(findErrors).some((value) => value !== "")) {
      setErrors(findErrors);
    } else {
      setLoading(true);
      signIn(email, password)
        .then((res) => {
          router.replace("../../(tabs)/dashboardScreen");
        })
        .catch((error) => {
          let newErrors = {
            email: "",
            password: "",
          };
          if (error.code === "auth/invalid-email") {
            newErrors.email = "Email or password invalid.";
          } else {
            newErrors.email = "Something went wrong.";
          }
          setErrors(newErrors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
          <QRCode value="https://www.google.com/" logoSize={100} />
          <View className="flex justify-center items-start w-full my-12 px-4">
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Nama</Text>
              </View>
              <View className="w-4/6">
                <Text className="text-base font-normal">: {penggunaNama}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">NIM</Text>
              </View>
              <View className="w-2/6">
                <Text className="text-base font-normal">: {penggunaNIM}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Plat Nomor</Text>
              </View>
              <View className="w-4/6">
                <Text className="text-base font-normal">: {penggunaPlat}</Text>
              </View>
            </View>
            <View className="flex flex-row h-10 w-full justify-start items-center bg-[#F5FFFF] px-4 border-b border-b-slate-300">
              <View className="w-2/6">
                <Text className="text-base font-normal">Saldo</Text>
              </View>
              <View className="w-2/6">
                <Text className="text-base font-normal">: Rp{penggunaSaldo},-</Text>
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
                      className="w-10/12 h-12 mx-4 bg-white"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Nama"
                      // value={email}
                      // onChangeText={(email) => {
                      //   setErrors(errors => ({ ...errors, email: "" })),
                      //   setEmail(email)
                      // }}
                      // error={errors.email !== ""}
                    />
                    <StyledHelperText type="error" visible={errors.nama !== ""}>
                      {errors.nama}
                    </StyledHelperText>
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="NIM"
                      // value={email}
                      // onChangeText={(email) => {
                      //   setErrors(errors => ({ ...errors, email: "" })),
                      //   setEmail(email)
                      // }}
                      // error={errors.email !== ""}
                    />
                    <StyledHelperText type="error" visible={errors.nim !== ""}>
                      {errors.nim}
                    </StyledHelperText>
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Plat"
                      // value={email}
                      // onChangeText={(email) => {
                      //   setErrors(errors => ({ ...errors, email: "" })),
                      //   setEmail(email)
                      // }}
                      // error={errors.email !== ""}
                    />
                    <StyledHelperText type="error" visible={errors.plat !== ""}>
                      {errors.plat}
                    </StyledHelperText>
                    <StyledTextInput
                      className="w-10/12 h-12 mx-4 bg-white"
                      outlineColor="#4D869C"
                      activeOutlineColor="#4D869C"
                      mode="outlined"
                      label="Saldo"
                      // value={email}
                      // onChangeText={(email) => {
                      //   setErrors(errors => ({ ...errors, email: "" })),
                      //   setEmail(email)
                      // }}
                      // error={errors.email !== ""}
                    />
                    <StyledHelperText type="error" visible={errors.saldo !== ""}>
                      {errors.saldo}
                    </StyledHelperText>
                  </View>
                  <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={() => setModalEditVisible(false)}>
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
