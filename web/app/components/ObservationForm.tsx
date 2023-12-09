import { type FormMethod, useSubmit, Form } from "@remix-run/react";
import { useState } from "react";
import { type HospitalProcedure } from "../entities/HospitalProcedure.ts";
import { ObservationType } from "../entities/Observation.ts";

interface ObservationFormProps {
  hospitalProcedure: HospitalProcedure | null;
}

const TYPE_TO_TEXT = {
  [ObservationType.NUTRITION]: "Restrição alimentar",
  [ObservationType.RECOMMENDATION]: "Recomendação",
  [ObservationType.MEDICINE]: "Medicamentos",
};

export function ObservationForm({ hospitalProcedure }: ObservationFormProps) {
  const [type, setType] = useState<ObservationType>(ObservationType.NUTRITION);
  const [content, setContent] = useState("");
  const submit = useSubmit();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("hospitalProcedureId", String(hospitalProcedure?.id));

    submit(formData, {
      method: (form.getAttribute("method") as FormMethod) ?? "post",
    });

    setContent("");
    setType(ObservationType.NUTRITION);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      method="POST"
      className="flex flex-col mt-2 gap-2"
      action=""
    >
      <select
        disabled={!hospitalProcedure}
        id="category"
        className="bg-gray-400 p-2 rounded-md"
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value as any)}
      >
        {Object.keys(TYPE_TO_TEXT).map((key) => (
          <option key={key} value={key}>
            {TYPE_TO_TEXT[key as ObservationType]}
          </option>
        ))}
      </select>
      <textarea
        disabled={!hospitalProcedure}
        className="bg-gray-400 h-[20vh] resize-none p-2 rounded-md"
        placeholder="Escreva a observação aqui"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex w-full gap-1 justify-between">
        <button
          disabled={!hospitalProcedure}
          className="bg-primary-500 font-bold text-white py-2 px-4 rounded-md hover:enabled:bg-primary-700 disabled:opacity-75"
        >
          Adicionar observação
        </button>
        <button
          disabled={!hospitalProcedure}
          className="bg-none text-secondary-500 border-2 border-secondary-500 hover:enabled:text-white hover:enabled:bg-secondary-500 disabled:opacity-75 font-bold py-2 px-4 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </Form>
  );
}
