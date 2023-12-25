import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/constants/Colors";
import { Hospital } from "@/entities/Hospital";

interface HospitalInformationProps {
  hospital?: Hospital;
}

export function HospitalInformation({ hospital }: HospitalInformationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {hospital && (
          <Image
            style={styles.hospitalIcon}
            source={require("../../assets/images/hospital-icon.png")}
          />
        )}
        <Text style={styles.title}>Hospital</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Name:</Text>
        <Text style={styles.regularText}>{hospital?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>CNPJ:</Text>
        <Text style={styles.regularText}>{hospital?.cnpj}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.boldText}>Address:</Text>
        <Text style={styles.regularText}>{hospital?.address}</Text>
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
  hospitalIcon: {
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
