import { useMatches, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog.tsx";
import { Popover, PopoverTrigger } from "./ui/popover.tsx";
import { Plus } from "phosphor-react";
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
} from "@radix-ui/react-popover";
import { api } from "../services/api.ts";
import { type Companion } from "../entities/Companion.ts";

interface NewHospitalProcedureDialogProps {
  doctorId: number;
  hospitalId: number;
}

export function NewHospitalProcedureDialog({
  doctorId,
  hospitalId,
}: NewHospitalProcedureDialogProps) {
  const matches = useMatches();
  const {
    params: { patientId },
  } = matches[matches.length - 1];
  const [type, setType] = useState<"Consulta" | "Exame" | "Cirurgia">(
    "Consulta"
  );
  const [companionList, setCompanionList] = useState<Companion[]>([]);
  const [selectedCompanionId,setSelectedCompanionId] = useState<number>();
  const [newCompanionName, setNewCompanionName] = useState("");
  const [newCompanionEmail, setNewCompanionEmail] = useState("");

  const revalidator = useRevalidator();


  const loadCompanions = async () => {
    const { data } = await api.get<Companion[]>("/companion");

    setCompanionList(data);
  };

  const handleCreateNewProcedure = async () => {
    try {
      const data = {
        type,
        status: "Opened",
        doctorId,
        patientId: Number(patientId),
        hospitalId,
        companionId: selectedCompanionId,
        startDate: new Date(),
      };

      await api.post("/hospital-procedure", data);
      revalidator.revalidate();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateNewCompanion = async () => {
    if (!newCompanionEmail.trim() || !newCompanionEmail.trim()) return;

    const data = {
      name: newCompanionName,
      email: newCompanionEmail,
    };

    await api.post("/companion", data);
    await loadCompanions();
  };

  useEffect(() => {
    loadCompanions();
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar nova consulta</DialogTitle>
        <DialogDescription>
          Criar uma nova consulta para o usuário atual
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <label>Tipo:</label>
        <select
          className="py-2 px-1"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="Consulta">Consulta</option>
          <option value="Exame">Exame</option>
          <option value="Cirurgia">Cirurgia</option>
        </select>
        <Popover>
          <div className="flex items-center gap-2">
            <label>Acompanhante: </label>
            <PopoverTrigger>
              <button className="bg-primary-500 hover:bg-primary-700 p-2 rounded-md text-white font-bold">
                <Plus />
              </button>
            </PopoverTrigger>
          </div>
          <PopoverContent
            side="right"
            className="flex flex-col gap-2 p-4 bg-white shadow-xl"
          >
            <h3 className="font-bold mb-2">Cadastrar novo acompanhante</h3>
            <PopoverArrow className="text-white" fill="white" />
            <input
              className="px-4 py-2"
              placeholder="Nome"
              value={newCompanionName}
              onChange={(e) => setNewCompanionName(e.target.value)}
            />
            <input
              className="px-4 py-2"
              type="email"
              placeholder="email"
              value={newCompanionEmail}
              onChange={(e) => setNewCompanionEmail(e.target.value)}
            />

            <PopoverClose>
              <button
                className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-2 rounded-md px-4 py-2"
                onClick={handleCreateNewCompanion}
              >
                Salvar
              </button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
        <select className="py-2 px-1" value={selectedCompanionId} onChange={e=>setSelectedCompanionId(parseInt(e.target.value))}>
          {companionList.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <DialogFooter>
        <button
          onClick={handleCreateNewProcedure}
          className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-2 rounded-md px-4 py-2"
        >
          Criar
        </button>
      </DialogFooter>
    </DialogContent>
  );
}
