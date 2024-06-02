import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, StatusBar, SafeAreaView } from "react-native";
import { styled } from "nativewind";
import { TextInput, HelperText, Button } from "react-native-paper";
import { router } from "expo-router";
import { useAuth } from "../../../../contexts/AuthProvider";
import Spinner from "react-native-loading-spinner-overlay";

const StyledTextInput = styled(TextInput);
const StyledHelperText = styled(HelperText);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSignIn = () => {
    const findErrors = validate();
    if (Object.values(findErrors).some(value => value !== "")) {
      setErrors(findErrors);
    } else {
      setLoading(true);
      signIn(email, password).then(res=>{
        router.replace("../../(tabs)/penggunaScreen")
      }).catch(error => {
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
      }).finally(() => {
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
      <ScrollView className="flex h-full w-full bg-[#CDE8E5]">
        <View className="flex justify-center items-center h-screen w-screen">
          <View className="flex justify-start items-center w-5/6 bg-white rounded-3xl shadow-lg shadow-black py-8">
            <Text className="text-2xl font-bold text-[#4D869C] mb-4">Login</Text>
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
            <Button className="mb-4 w-36" buttonColor="#4D869C" mode="contained" onPress={handleSignIn}>
              <Text className="text-white text-base font-medium">
                Login
              </Text>
            </Button>
            <View className="flex-row justify-center items-center">
              <Text className="text-base font-normal text-slate-500">Belum punya akun? </Text>
              <Text onPress={() => router.navigate("../registerScreen")} className="text-base font-semibold text-[#4D869C]">Register</Text>
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

export default LoginScreen;
