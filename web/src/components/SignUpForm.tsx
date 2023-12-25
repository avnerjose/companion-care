"use client";

import { useToast } from "@/components/ui/use-toast";
import { Input, MaskedInput } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Doctor } from "@/entities/Doctor";
import { remoteApi } from "@/services/remote-api";
import { Hospital } from "@/entities/Hospital";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signUpFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "E-mail is required",
    })
    .email({
      message: "Invalid e-mail",
    }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  cpf: z
    .string({
      required_error: "CPF is required",
    })
    .min(14, {
      message: "Invalid CPF",
    })
    .max(14, {
      message: "Invalid CPF",
    })
    .refine((value) => value.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/), {
      message: "Invalid CPF",
    }),
  sex: z.enum(["M", "F"], {
    required_error: "Gender is required",
  }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1)
    .refine((value) => value.match(/^\(\d{2}\) \d{5}-\d{4}$/), {
      message: "Invalid phone number",
    }),
  city: z.string({
    required_error: "City is required",
  }),
  specialty: z.string({
    required_error: "Specialty is required",
  }),
  crm: z
    .string({
      required_error: "CRM is required",
    })
    .min(13, {
      message: "Invalid CRM",
    })
    .max(13, {
      message: "CRM is required",
    })
    .refine((value) => value.match(/CRM\/\w{2}-\d{6}$/), {
      message: "Invalid CRM",
    }),
  hospitalId: z.coerce.number({
    required_error: "Hospital is required",
  }),
});

type SignUpFormType = z.infer<typeof signUpFormSchema>;

interface SignUpFormProps {
  hospitalList: Hospital[];
}
export function SignUpForm({ hospitalList }: SignUpFormProps) {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: SignUpFormType) => {
    try {
      const data: Omit<Doctor, "id" | "accessToken"> = {
        ...values,
        dateOfBirth: values?.dateOfBirth.toISOString(),
      };

      await remoteApi("/doctor", {
        body: JSON.stringify(data),
        method: "POST",
      });

      toast({
        title: "Account created!",
        description: "Your account was created, log in to access the platform!",
      });

      form.reset({
        name: "",
        cpf: "",
        sex: undefined,
        phoneNumber: "",
        city: "",
        email: "",
        dateOfBirth: undefined,
        crm: "",
        hospitalId: undefined,
        specialty: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (e) {
      toast({
        title: "Error while creating your account",
        description: "Please make sure your data is correct",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4"
        >
          <div className="flex flex-col gap-1">
            <p className="text-gray-500">
              Enter your credentials to create your account
            </p>

            <div className="flex gap-2">
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
            </div>
            <FormField
              control={form.control}
              name="hospitalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an hospital" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hospitalList.map(({ id, name }) => (
                        <SelectItem key={id} value={String(id)}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
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

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty: </FormLabel>
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
                name="crm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CRM: </FormLabel>
                    <FormControl>
                      <MaskedInput
                        {...field}
                        maskProps={{
                          showMask: true,
                          separate: true,
                          mask: "CRM/##-______",
                          replacement: { "#": /[A-Z]/i, _: /\d/ },
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
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        fromYear={1960}
                        toYear={2030}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Log In</Button>
        </form>
      </Form>
      <div className="flex items-center gap-2">
        <p>Already has an account?</p>
        <Link href="/login" className="text-primary-500 font-bold">
          Login to an existing account
        </Link>
      </div>
    </>
  );
}
