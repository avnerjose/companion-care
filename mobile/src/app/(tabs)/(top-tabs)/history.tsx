import { LocationHistoryList } from "@/components/LocationHistory/LocationHistoryList";
import { useHospitalProcedure } from "@/contexts/hospital-procedure.context";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

export default function HistoryScreen() {
  const { locationRecords } = useHospitalProcedure();
  return (
    <SafeAreaView style={styles.container}>
      <LocationHistoryList locationRecords={locationRecords} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
