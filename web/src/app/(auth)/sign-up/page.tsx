import { fetchHospitalList } from "@/app/actions";
import { SignUpForm } from "@/components/SignUpForm";

export default async function SignUp() {
  const hospitalList = await fetchHospitalList();

  return (
    <>
      <h1 className="text-secondary-700 text-2xl font-bold">Sign Up</h1>
      <SignUpForm hospitalList={hospitalList ?? []}/>
    </>
  );
}
