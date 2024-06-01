import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { IconDashboard, IconLibrary } from "../../../assets";
import { LinearGradient } from 'expo-linear-gradient';

const BottomNavigatorItem = ({ label, isFocused, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
      className="items-center justify-center"
    >
      {label === "Pengguna" && ( isFocused ? (
        <View className="flex h-full items-center justify-center relative">
          <View className="before:w-full before:h-1 before:absolute before:-top-3 before:bg-[#1A8EFD]"></View>
          <LinearGradient
            colors={['rgba(54, 120, 221, 0.18)', 'rgba(244, 244, 244, 0.30)']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <IconDashboard height={24} width={24} />
        </View>
      ) : (       
        <IconDashboard height={24} width={24} />
      ))}
      {label === "Riwayat" && ( isFocused ? (
        <View className="flex h-full items-center justify-center relative">
          <View className="before:w-full before:h-1 before:absolute before:-top-3 before:bg-[#1A8EFD]"></View>
          <LinearGradient
            colors={['rgba(54, 120, 221, 0.18)', 'rgba(244, 244, 244, 0.30)']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <IconLibrary height={24} width={24} />
        </View>
      ) : (       
        <IconLibrary height={24} width={24} />
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: -8,
    width: '100%',
    height: '120%',
    transparant: 0.2
  },
});


export default BottomNavigatorItem;
