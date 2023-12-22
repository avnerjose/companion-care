import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { api } from "@/services/api";
import { type Companion } from "@/entities/Companion";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { HospitalProcedureType } from "@/entities/HospitalProcedure";
import { HOSPITAL_PROCEDURE_TYPE_TO_TEXT } from "@/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/User.context";
import { revalidateCurrentHospitalProcedure } from "@/app/actions";

export function NewHospitalProcedureDialog() {
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  const [type, setType] = useState<HospitalProcedureType | undefined>();
  const [companionList, setCompanionList] = useState<Companion[]>([]);
  const [selectedCompanionId, setSelectedCompanionId] = useState<number>();
  const [newCompanionName, setNewCompanionName] = useState("");
  const [newCompanionEmail, setNewCompanionEmail] = useState("");
  const { user } = useUser();

  const loadCompanions = async () => {
    const { data } = await api.get<Companion[]>("/companion");

    setCompanionList(data);
  };

  const handleCreateNewProcedure = async () => {
    try {
      const data = {
        type,
        status: "Opened",
        doctorId: user?.id,
        patientId: Number(id),
        hospitalId: user?.hospitalId,
        companionId: selectedCompanionId,
        startDate: new Date(),
      };

      await api.post("/hospital-procedure", data);
      revalidateCurrentHospitalProcedure();
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
        <DialogTitle>Create new procedure</DialogTitle>
        <DialogDescription>
          Create a new procedure for the current user
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Label htmlFor="type">Type:</Label>
        <Select
          name="type"
          onValueChange={(value) => setType(value as any)}
          value={type}
        >
          <SelectTrigger className="bg-gray-100">
            <SelectValue placeholder="Select an procedure type" />
          </SelectTrigger>
          <SelectContent id="type">
            <SelectGroup>
              <SelectLabel className="bg-gray-100">Procedure Types</SelectLabel>
              {Object.keys(HOSPITAL_PROCEDURE_TYPE_TO_TEXT).map((type) => (
                <SelectItem
                  className="bg-white border-b"
                  key={type}
                  value={type}
                >
                  {
                    HOSPITAL_PROCEDURE_TYPE_TO_TEXT[
                      type as HospitalProcedureType
                    ]
                  }
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover>
          <div className="flex items-center gap-2">
            <Label>Companion: </Label>
            <PopoverTrigger>
              <Button variant="outline" className="rounded-full w-8 h-8 p-0">
                <Plus className="stroke-gray-900" size={20} />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent
            side="right"
            className="flex flex-col gap-2 p-4 bg-white shadow-xl"
          >
            <h3 className="font-bold mb-2">Create new Companion</h3>
            <PopoverArrow className="text-white" fill="white" />
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="px-4 py-2"
              placeholder="Companion name"
              value={newCompanionName}
              onChange={(e) => setNewCompanionName(e.target.value)}
            />
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              className="px-4 py-2"
              type="email"
              placeholder="Companion E-mail"
              value={newCompanionEmail}
              onChange={(e) => setNewCompanionEmail(e.target.value)}
            />

            <PopoverClose>
              <Button onClick={handleCreateNewCompanion}>Save</Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>

        <Select
          name="companion"
          onValueChange={(value) => setSelectedCompanionId(parseInt(value))}
          value={String(selectedCompanionId)}
          disabled={!companionList.length}
        >
          <SelectTrigger className="bg-gray-100">
            <SelectValue placeholder="Select an companion" />
          </SelectTrigger>
          <SelectContent id="companion">
            <SelectGroup>
              <SelectLabel className="bg-gray-100">
                Available Companions
              </SelectLabel>
              {companionList.map(({ id, name }) => (
                <SelectItem
                  className="bg-white border-b"
                  key={id}
                  value={String(id)}
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button onClick={handleCreateNewProcedure}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
