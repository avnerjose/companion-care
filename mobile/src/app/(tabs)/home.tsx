import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PatientInformation } from "@/components/PatientInformation";
import Colors from "@/constants/Colors";
import { useHospitalProcedure } from "@/contexts/hospital-procedure.context";
import { DoctorInformation } from "@/components/DoctorInformation";
import { SafeAreaView } from "react-native";
import { HospitalInformation } from "@/components/HospitalInformation";
import { HospitalProcedureInformation } from "@/components/HospitalProcedureInformation";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Collapsible } from "@/components/Collapsible";

export default function Home() {
  const {
    patient,
    doctor,
    hospital,
    hospitalProcedure,
    fetchHospitalProcedureData,
  } = useHospitalProcedure();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitalProcedureData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32, gap: 8 }}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Collapsible label="Current procedure information" defaultIsOpen={true}>
          <HospitalProcedureInformation hospitalProcedure={hospitalProcedure} />
          <PatientInformation patient={patient} />
        </Collapsible>

        <Collapsible label="Hospital information">
          <HospitalInformation hospital={hospital} />
          <DoctorInformation doctor={doctor} />
        </Collapsible>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.light.background,
    maxHeight: "100%",
  },
  boldText: {
    fontSize: 20,
    color: Colors.light.secondary[700],
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
