import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

interface CollapsibleProps extends PropsWithChildren {
  label: string;
  defaultIsOpen?: boolean;
}

export function Collapsible({
  label,
  children,
  defaultIsOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsOpen((prev) => !prev)}>
        <View style={styles.row}>
          <Entypo
            name={isOpen ? "triangle-down" : "triangle-right"}
            size={24}
            color={Colors.light.primary[500]}
          />
          <Text style={styles.boldText}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
      {isOpen && <>{children}</>}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  boldText: {
    fontSize: 20,
    color: Colors.light.secondary[700],
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
});
