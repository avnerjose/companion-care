import Colors from "@/constants/Colors";
import { View, Text, StyleSheet, Image } from "react-native";
import MalePatientIcon from "../../assets/images/patient-M.png";
import FemalePatientIcon from "../../assets/images/patient-F.png";
import { Patient } from "@/entities/Patient";

interface PatientInformationProps {
  patient?: Patient;
}

export function PatientInformation({ patient }: PatientInformationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {patient && (
          <Image
            style={styles.patientIcon}
            source={patient.sex === "M" ? MalePatientIcon : FemalePatientIcon}
          />
        )}
        <Text style={styles.title}>Paciente</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Nome:</Text>
        <Text style={styles.regularText}>{patient?.name ?? "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Status:</Text>
        <Text style={styles.regularText}>{patient?.status ?? "-"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Data de nascimento:</Text>
        <Text style={styles.regularText}>
          {patient?.dateOfBirth
            ? new Date(patient?.dateOfBirth).toLocaleDateString()
            : "-"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Sexo:</Text>
        <Text style={styles.regularText}>{patient?.sex ?? "-"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    borderLeftWidth: 8,
    borderLeftColor: Colors.light.primary[500],
  },
  title: {
    color: Colors.light.secondary[700],
    fontWeight: "bold",
    fontSize: 22,
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
  row: {
    flexDirection: "row",
    gap: 8,
  },
  patientIcon: {
    height: 38,
    width: 38,
  },
  header: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
});
