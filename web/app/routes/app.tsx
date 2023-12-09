import {
  redirect,
  type LoaderArgs,
  type ActionArgs,
  type TypedResponse,
} from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import { User, SignOut, Plus } from "phosphor-react";
import DoctorIcon from "../assets/icons/doctor-icon.png";
import { type Doctor, getUserSession, logout } from "../utils/session.server.ts";
import { NewHospitalProcedureDialog } from "../components/NewHospitalProcedureDialog.tsx";
import { Dialog } from "../components/ui/dialog.tsx";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Logo from "../assets/icons/logo.svg";

type LoaderData = {
  doctor: Doctor;
};

export async function loader({
  request,
}: LoaderArgs): Promise<LoaderData | TypedResponse<never>> {
  const doctor = await getUserSession(request);

  if (!doctor) {
    return redirect("/auth/login");
  }

  return {
    doctor,
  };
}

export async function action({ request }: ActionArgs) {
  return await logout(request);
}

export default function App() {
  const matches = useMatches();
  const { doctor } = useLoaderData<LoaderData>();

  const { id } = matches[matches.length - 1];

  return (
    <div className="bg-[#F5F7FB] min-h-screen flex">
      <header className="flex justify-between items-center absolute top-0 left-0 right-0 py-4 px-4 pl-20 bg-white shadow-default gap-4">
        <span className="ml-3 text-secondary-500 uppercase font-bold text-xl font-['Montserrat']">
          Companion<span className="text-primary-500">Care</span>
        </span>
        <div className="flex gap-2">
          {id.includes("patients.$patientId") && (
            <Dialog >
              <DialogTrigger  className="bg-primary-500 hover:bg-primary-700 text-white flex items-center gap-2 rounded-md px-4 py-2">
                Nova Consulta <Plus size={24} />
              </DialogTrigger>
              <NewHospitalProcedureDialog doctorId={doctor.id} hospitalId={doctor.hospitalId}/>
            </Dialog>
          )}
          <div className="bg-secondary-700 p-1 rounded-md">
            <img alt="doctor icon" className="w-8 h-8" src={DoctorIcon} />
          </div>
        </div>
      </header>
      <aside className="fixed top-0 left-0 bottom-0 flex flex-col items-center justify-between z-10 py-6 px-2 bg-secondary-700 rounded-tr-lg shadow-default">
        <div>
          <img src={Logo} alt="" className="bg-background border border-background h-10 rounded-full" />
        </div>
        <nav className="mt-4">
          <ol>
            <li>
              <Link
                to="/app/patients"
                className="flex items-center gap-2 px-4 py-2 text-lg text-white"
              >
                <User size={24} weight="fill" />
              </Link>
            </li>
          </ol>
        </nav>
        <div>
          <Form method="post">
            <button type="submit">
              <SignOut className="text-white" size={24} />
            </button>
          </Form>
        </div>
      </aside>
      <main className="w-full ml-20 mt-20">
        <Outlet />
      </main>
    </div>
  );
}
