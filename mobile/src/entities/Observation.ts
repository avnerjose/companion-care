export enum ObservationType {
  MEDICINE = "medicine",
  RECOMMENDATION = "recommendation",
  NUTRITION = "nutrition"
}

export type Observation = {
  id: number;
  type: ObservationType;
  createdAt: string;
  content: string;
  hospitalProcedureId: number;
};
