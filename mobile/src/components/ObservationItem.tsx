import Colors from "@/constants/Colors";
import { Observation, ObservationType } from "@/entities/Observation";
import NutritionIcon from "../../assets/images/nutrition.svg";
import RecommendationIcon from "../../assets/images/recommendation.svg";
import MedicineIcon from "../../assets/images/medicine.svg";
import { View, Text, StyleSheet } from "react-native";

interface ObservationItemProps {
  observation: Observation;
}

const TYPE_TO_TEXT = {
  [ObservationType.NUTRITION]: "Food restriction",
  [ObservationType.RECOMMENDATION]: "Recommendation",
  [ObservationType.MEDICINE]: "Medicines",
};

const TYPE_TO_ICON = {
  [ObservationType.NUTRITION]: NutritionIcon,
  [ObservationType.RECOMMENDATION]: RecommendationIcon,
  [ObservationType.MEDICINE]: MedicineIcon,
};

export function ObservationItem({ observation }: ObservationItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {TYPE_TO_ICON[observation.type]({ width: 24, height: 24 })}
        <Text style={styles.title}>{TYPE_TO_TEXT[observation.type]}</Text>
      </View>
      <Text style={styles.regularText}>{observation.content}</Text>
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
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
});
