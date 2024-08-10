import Image from "next/image";
import { SignupFormDemo } from "./components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignupFormDemo />
    </main>
  );
}
