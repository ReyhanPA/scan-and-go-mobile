import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, Text } from "react-native";

const RiwayatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Riwayat</Text>
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
