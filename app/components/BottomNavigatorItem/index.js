import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { IconPengguna, IconRiwayat } from "../../../assets";
import { LinearGradient } from 'expo-linear-gradient';

const BottomNavigatorItem = ({ label, isFocused, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
      className="items-center justify-center"
    >
      {label === "Pengguna" && ( isFocused ? (
        <View className="flex h-full items-center justify-center relative">
          <View className="before:w-full before:h-1 before:absolute before:-top-3 before:bg-[#7AB2B2]"></View>
          <LinearGradient
            colors={['rgba(122, 178, 178, 0.3)', 'rgba(122, 178, 178, 0.2)', 'rgba(122, 178, 178, 0.1)']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <IconPengguna height={32} width={32} />
        </View>
      ) : (       
        <IconPengguna height={32} width={32} />
      ))}
      {label === "Riwayat" && ( isFocused ? (
        <View className="flex h-full items-center justify-center relative">
          <View className="before:w-full before:h-1 before:absolute before:-top-3 before:bg-[#7AB2B2]"></View>
          <LinearGradient
            colors={['rgba(122, 178, 178, 0.3)', 'rgba(122, 178, 178, 0.2)', 'rgba(122, 178, 178, 0.1)']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <IconRiwayat height={32} width={32} />
        </View>
      ) : (       
        <IconRiwayat height={32} width={32} />
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
