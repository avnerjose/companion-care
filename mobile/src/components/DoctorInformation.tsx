import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/constants/Colors";
import { Doctor } from "@/entities/Doctor";
import MaleDoctorIcon from "../../assets/images/doctor-M.png";
import FemaleDoctorIcon from "../../assets/images/doctor-F.png";

interface DoctorInformationProps {
  doctor?: Doctor;
}

export function DoctorInformation({ doctor }: DoctorInformationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {doctor && (
          <View
            style={Object.assign(
              {},
              styles.iconCircle,
              doctor.sex === "M" ? styles.backgroundBlue : styles.backgroundPink
            )}
          >
            <Image
              style={styles.doctorIcon}
              source={doctor.sex === "M" ? MaleDoctorIcon : FemaleDoctorIcon}
            />
          </View>
        )}
        <Text style={styles.title}>Médico </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Nome:</Text>
        <Text style={styles.regularText}>{doctor?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>CRM:</Text>
        <Text style={styles.regularText}>{doctor?.crm}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Especialidade:</Text>
        <Text style={styles.regularText}>{doctor?.specialty}</Text>
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
    borderLeftColor: Colors.light.primary[700],
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
  doctorIcon: {
    height: 32,
    width: 32,
  },
  header: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  iconCircle: {
    borderRadius: 1000,
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  backgroundPink: {
    backgroundColor: Colors.light.pink[500],
  },
  backgroundBlue: {
    backgroundColor: Colors.light.blue[500],
  },
});
