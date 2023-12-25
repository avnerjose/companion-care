import Colors from "@/constants/Colors";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: keyof typeof Ionicons.glyphMap;
  isLoading?: boolean;
  styleSheet?: {};
}

export function IconButton({
  iconName,
  isLoading = false,
  styleSheet,
  ...rest
}: IconButtonProps) {
  return (
    <TouchableOpacity style={{ ...styles.container, ...styleSheet }} {...rest}>
      {isLoading ? (
        <ActivityIndicator color="white" size={32} />
      ) : (
        <Ionicons style={styles.icon} name={iconName} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary[500],
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
});
