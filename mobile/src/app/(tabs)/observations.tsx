import { ObservationItem } from "@/components/ObservationItem";
import Colors from "@/constants/Colors";
import { useHospitalProcedure } from "@/contexts/hospital-procedure.context";
import { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { FlatList, SafeAreaView } from "react-native";

export default function ObservationsScreen() {
  const { observations, fetchHospitalProcedureData } = useHospitalProcedure();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitalProcedureData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={observations.sort(
          (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
        )}
        renderItem={({ item }) => <ObservationItem observation={item} />}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.light.background,
    gap: 8,
  },
});
