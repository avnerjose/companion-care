import { format } from "date-fns";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, MaskedInput } from "@/components/ui/input";
import { useUser } from "@/contexts/User.context";
import { revalidatePatientsList } from "@/app/actions";
import { remoteApi } from "@/services/remote-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Patient } from "@/entities/Patient";
import { useToast } from "@/components/ui/use-toast";

const newPatientSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  cpf: z
    .string({
      required_error: "CPF is required",
    })
    .min(14, { message: "Invalid CPF" })
    .max(14, { message: "Invalid CPF" })
    .refine(
      (value) => {
        return value.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
      },
      { message: "Invalid CPF" }
    ),
  sex: z.enum(["M", "F"], {
    required_error: "Gender is required",
  }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, { message: "Phone number is required" }),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, { message: "City is required" }),
  email: z
    .string({
      required_error: "E-mail is required",
    })
    .email({ message: "Invalid e-mail" })
    .min(1, { message: "E-mail is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
});

export function NewPatientDialog() {
  const { user } = useUser();
  const form = useForm<z.infer<typeof newPatientSchema>>({
    resolver: zodResolver(newPatientSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof newPatientSchema>) => {
    if (!user) return;

    try {
      const data: Omit<Patient, "id"> = {
        ...values,
        dateOfBirth: values.dateOfBirth.toISOString(),
        status: "Awaiting",
        hospitalId: user.hospitalId,
      };

      await remoteApi("/patient", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      });
      revalidatePatientsList();

      toast({
        title: "Patient created",
        description: "Your patient has been created successfully",
      });

      form.reset({
        name: "",
        cpf: "",
        sex: undefined,
        phoneNumber: "",
        city: "",
        email: "",
        dateOfBirth: undefined,
      });
    } catch (e) {
      toast({
        title: "Error while creating the new patient",
        description: "An error occurred while creating the patient",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new patient</DialogTitle>
        <DialogDescription>
          Create a new patient on the current hospital
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name: </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City: </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF: </FormLabel>
                  <FormControl>
                    <MaskedInput
                      {...field}
                      maskProps={{
                        showMask: true,
                        mask: "___.___.___-__",
                        replacement: { _: /\d/ },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number: </FormLabel>
                  <FormControl>
                    <MaskedInput
                      {...field}
                      maskProps={{
                        showMask: true,
                        mask: "(__) 9____-____",
                        replacement: { _: /\d/ },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender: </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="M" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-ful">
                <FormLabel>Date of birth: </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full">
                      <Button className="w-full pl-3 text-left text-gray-900 font-normal bg-gray-100 hover:bg-gray-200/80">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-6" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
