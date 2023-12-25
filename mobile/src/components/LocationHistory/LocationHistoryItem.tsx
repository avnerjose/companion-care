import Colors from "@/constants/Colors";
import { LocationRecord } from "@/entities/LocationRecord";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

interface LocationHistoryItemProps {
  isLatest?: boolean;
  locationRecord: LocationRecord;
}

export function LocationHistoryItem({
  isLatest = false,
  locationRecord,
}: LocationHistoryItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Ionicons
          name="location"
          size={16}
          color={
            isLatest ? Colors.light.primary[500] : Colors.light.secondary[700]
          }
        />
        <Entypo
          name="dots-three-vertical"
          color={Colors.light.secondary[500]}
        />
        <Entypo
          style={{ marginTop: -1 }}
          name="dots-two-vertical"
          color={Colors.light.secondary[500]}
        />
      </View>
      <View>
        <Text style={styles.regularText}>
          {new Intl.DateTimeFormat("pt-BR").format(
            new Date(locationRecord.timestamp)
          )}{" "}
          -{" "}
          {new Intl.DateTimeFormat("pt-BR", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(locationRecord.timestamp))}
          h
        </Text>
        <View>
          <View style={styles.row}>
            <Text style={styles.boldText}>Sector:</Text>
            <Text style={styles.regularText}>
              {locationRecord.sectorName ?? "-"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>Room:</Text>
            <Text style={styles.regularText}>
              {locationRecord.roomName ?? "-"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.light.gray[100],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  column: {
    alignItems: "center",
  },
  boldText: {
    color: Colors.light.secondary[700],
    fontWeight: "bold",
    fontSize: 18,
  },
  regularText: {
    fontSize: 18,
    color: Colors.light.secondary[700],
  },
});
