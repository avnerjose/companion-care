"use client";

import { FormEvent, useState } from "react";
import { ObservationType } from "@/entities/Observation";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  OBSERVATION_TYPE_TO_ICON,
  OBSERVATION_TYPE_TO_TEXT,
} from "@/constants";
import Image from "next/image";
import { HospitalProcedure } from "@/entities/HospitalProcedure";
import { revalidateCurrentHospitalProcedure } from "@/app/actions";

interface ObservationFormProps {
  hospitalProcedure: HospitalProcedure | null;
}

export function ObservationForm({ hospitalProcedure }: ObservationFormProps) {
  const [type, setType] = useState<ObservationType | undefined>();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content?.trim() || !type?.trim() || !hospitalProcedure === null) {
      return null;
    }

    try {
      await api.post("/observation", {
        content,
        type,
        hospitalProcedureId: hospitalProcedure?.id,
      });

      revalidateCurrentHospitalProcedure();
    } catch (e) {
      console.log(e);
    }

    setContent("");
    setType(ObservationType.NUTRITION);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-2 gap-2">
      <Select
        disabled={!hospitalProcedure}
        name="type"
        onValueChange={(value) => setType(value as any)}
        value={type}
      >
        <SelectTrigger className="bg-gray-100">
          <SelectValue placeholder="Select an observation type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="bg-gray-100">Observation Types</SelectLabel>
            {Object.keys(OBSERVATION_TYPE_TO_TEXT).map((type) => (
              <SelectItem className="bg-white border-b" key={type} value={type}>
                <div className="flex items-center gap-2">
                  <Image
                    className="w-5 h-5"
                    src={OBSERVATION_TYPE_TO_ICON[type as ObservationType]}
                    alt={
                      OBSERVATION_TYPE_TO_TEXT[type as ObservationType] +
                      " icon"
                    }
                  />
                  {OBSERVATION_TYPE_TO_TEXT[type as ObservationType]}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Textarea
        disabled={!hospitalProcedure}
        className="h-[20vh] resize-none p-2 rounded-md"
        placeholder="Write down your observation here..."
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex w-full gap-1 justify-between">
        <Button
          disabled={!hospitalProcedure}
          className="hover:enabled:bg-primary-700"
        >
          Add Observation
        </Button>
        <Button
          variant="outline"
          disabled={!hospitalProcedure}
          className=" hover:enabled:text-white hover:enabled:bg-secondary-500 font-bold"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
