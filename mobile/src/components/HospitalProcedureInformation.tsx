import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/constants/Colors";
import { HospitalProcedure } from "@/entities/HospitalProcedure";

interface HospitalProcedureInformationProps {
  hospitalProcedure?: HospitalProcedure;
}

export function HospitalProcedureInformation({
  hospitalProcedure,
}: HospitalProcedureInformationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {hospitalProcedure && (
          <Image
            style={styles.hospitalProcedureIcon}
            source={require("../../assets/images/hospital-procedure-icon.png")}
          />
        )}
        <Text style={styles.title}>Consulta médica</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Tipo:</Text>
        <Text style={styles.regularText}>{hospitalProcedure?.type}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Data de início:</Text>
        <Text style={styles.regularText}>
          {hospitalProcedure && (
            <>
              {new Intl.DateTimeFormat("pt-BR").format(
                new Date(hospitalProcedure?.startDate)
              )}
            </>
          )}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Status:</Text>
        <Text style={styles.regularText}>{hospitalProcedure?.status}</Text>
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
    flexWrap: "wrap",
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
    flex: 1,
    width: "100%",
    fontSize: 18,
    color: Colors.light.secondary[700],
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  hospitalProcedureIcon: {
    height: 32,
    width: 32,
  },
  header: {
    alignItems: "center",
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
