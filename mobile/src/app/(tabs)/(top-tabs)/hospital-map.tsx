import { HospitalMap } from "@/components/HospitalMap";
import Colors from "@/constants/Colors";
import { useHospitalProcedure } from "@/contexts/hospital-procedure.context";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";

export default function HospitalMapScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    locationRecords,
    fetchHospitalProcedureData,
  } = useHospitalProcedure();
  const mostRecentLocation = locationRecords?.sort(
    (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)
  )[0];

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitalProcedureData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ width: "100%", alignItems: "center", paddingTop: 8 }}>
        <Text>
          <Text style={styles.boldText}>Room: </Text>
          <Text style={styles.regularText}>
            {mostRecentLocation.roomName} |{" "}
          </Text>
          <Text style={styles.boldText}>Sector: </Text>
          <Text style={styles.regularText}>
            {mostRecentLocation.sectorName}
          </Text>
        </Text>
      </View>
      <HospitalMap activeCoordinate={mostRecentLocation.roomId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    height: "100%",
    width: "100%",
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
