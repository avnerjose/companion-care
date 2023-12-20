import { ObservationType } from "@/entities/Observation";
import NutritionIcon from "@/assets/icons/nutrition.svg";
import RecommendationIcon from "@/assets/icons/recommendation.svg";
import MedicineIcon from "@/assets/icons/medicine.svg";

export const AUTH_TOKEN_NAME = "companion-care-session";

export const OBSERVATION_TYPE_TO_TEXT = {
  [ObservationType.NUTRITION]: "Food restriction",
  [ObservationType.RECOMMENDATION]: "Recommendation",
  [ObservationType.MEDICINE]: "Medicines",
};

export const OBSERVATION_TYPE_TO_ICON = {
  [ObservationType.NUTRITION]: NutritionIcon,
  [ObservationType.RECOMMENDATION]: RecommendationIcon,
  [ObservationType.MEDICINE]: MedicineIcon,
};