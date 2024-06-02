import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, StatusBar, SafeAreaView } from "react-native";
import { styled } from "nativewind";
import { TextInput, HelperText, Button } from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "../../../../contexts/AuthProvider";
import firestore from '@react-native-firebase/firestore';
import Spinner from "react-native-loading-spinner-overlay";

const StyledTextInput = styled(TextInput);
const StyledHelperText = styled(HelperText);

const RegisterScreen = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [plat, setPlat] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    nama: "",
    nim: "",
    plat: "",
    saldo: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validate = () => {
    let newErrors = {
      nama: "",
      nim: "",
      plat: "",
      saldo: "",
      email: "",
      password: "",
    };

    if (!nama) {
      newErrors.nama = "Nama is required";
    }

    if (!nim) {
      newErrors.nim = "NIM is required";
    }

    if (!plat) {
      newErrors.plat = "Plat is required";
    }

    if (!saldo) {
      newErrors.saldo = "Saldo is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignUp = async () => {
    const findErrors = validate();
    if (Object.values(findErrors).some(value => value !== "")) {
      setErrors(findErrors);
    } else {
      setLoading(true);
      try {
        const res = await signUp(email, password);
        const uid = res.user.uid;
        await firestore().collection('users').doc(uid).set({
          uid: uid,
          nama: nama,
          nim: nim,
          plat: plat,
          saldo: parseInt(saldo),
          email: email,
          role: "pengguna",
          qrcode: uid,
          created_at: firestore.FieldValue.serverTimestamp(),
          updated_at: null,
        });
        router.replace("../../(tabs)/penggunaScreen");
      } catch (error) {
        let newErrors = {
          email: "",
          password: ""
        };
        if (error.code === "auth/invalid-email") {
          newErrors.email = "Email or password invalid.";
        } else {
          newErrors.email = "Something went wrong.";
        }
        setErrors(newErrors);
      } finally {
        setLoading(false);
      }
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
      <ScrollView className="flex h-full w-full bg-[#CDE8E5]">
        <View className="flex justify-center items-center h-screen w-screen">
          <View className="flex justify-start items-center w-5/6 bg-white rounded-3xl shadow-lg shadow-black py-8">
            <Text className="text-2xl font-bold text-[#4D869C] mb-4">Register</Text>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="Nama"
              value={nama}
              onChangeText={(nama) => {
                setErrors(errors => ({ ...errors, nama: "" })),
                setNama(nama)
              }}
              error={errors.nama !== ""}
            />
            <StyledHelperText type="error" visible={errors.nama !== ""}>{errors.nama}</StyledHelperText>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="NIM"
              value={nim}
              onChangeText={(nim) => {
                setErrors(errors => ({ ...errors, nim: "" })),
                setNim(nim)
              }}
              error={errors.nim !== ""}
            />
            <StyledHelperText type="error" visible={errors.nim !== ""}>{errors.nim}</StyledHelperText>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="Plat"
              value={plat}
              onChangeText={(plat) => {
                setErrors(errors => ({ ...errors, plat: "" })),
                setPlat(plat)
              }}
              error={errors.plat !== ""}
            />
            <StyledHelperText type="error" visible={errors.plat !== ""}>{errors.plat}</StyledHelperText>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="Saldo"
              value={saldo}
              onChangeText={(saldo) => {
                setErrors(errors => ({ ...errors, saldo: "" })),
                setSaldo(saldo)
              }}
              error={errors.saldo !== ""}
            />
            <StyledHelperText type="error" visible={errors.saldo !== ""}>{errors.saldo}</StyledHelperText>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={(email) => {
                setErrors(errors => ({ ...errors, email: "" })),
                setEmail(email)
              }}
              error={errors.email !== ""}
            />
            <StyledHelperText type="error" visible={errors.email !== ""}>{errors.email}</StyledHelperText>
            <StyledTextInput
              className="w-10/12 h-12 mx-4 bg-white"
              outlineColor="#4D869C"
              activeOutlineColor="#4D869C"
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(password) => {
                setErrors(errors => ({ ...errors, password: "" })),
                setPassword(password)
              }}
              error={errors.password !== ""}
              secureTextEntry={true}
            />
            <StyledHelperText type="error" visible={errors.password !== ""}>{errors.password}</StyledHelperText>
            <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={handleSignUp}>
              <Text className="text-white text-base font-medium">
                Register
              </Text>
            </Button>
            <View className="flex-row justify-center items-center">
              <Text className="text-base font-normal text-slate-500">Sudah punya akun? </Text>
              <Text onPress={() => router.navigate("../loginScreen")} className="text-base font-semibold text-[#4D869C]">Login</Text>
            </View>
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
});

export default RegisterScreen;
