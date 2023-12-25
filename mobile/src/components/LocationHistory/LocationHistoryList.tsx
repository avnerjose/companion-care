import Colors from "@/constants/Colors";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { View, Text } from "react-native";
import { LocationHistoryItem } from "./LocationHistoryItem";
import { LocationRecord } from "@/entities/LocationRecord";
import { useState } from "react";
import { useHospitalProcedure } from "@/contexts/hospital-procedure.context";

interface LocationHistoryListProps {
  locationRecords: LocationRecord[];
}

export function LocationHistoryList({
  locationRecords,
}: LocationHistoryListProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { fetchHospitalProcedureData } = useHospitalProcedure();

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitalProcedureData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location History</Text>
      <FlatList
        data={locationRecords.sort(
          (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
        )}
        renderItem={({ item, index }) => (
          <LocationHistoryItem locationRecord={item} isLatest={index === 0} />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    // height: "100%",
  },
  title: {
    color: Colors.light.secondary[700],
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 16,
  },
});
