import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import CustomButton from "./components/ButtonComponenet";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black items-center justify-center ">
      <div className="relative ">
        <Image
          className="animate-wobble hidden sm:block min-w-[300px] "
          src="/tictactoe.svg"
          alt="Tic-Tac-Toe Image"
          width={711}
          height={144}
        />
        <Image
          className="animate-wobble block sm:hidden "
          src="/tictactoe-mobile.svg"
          alt="Tic-Tac-Toe Image"
          width={182}
          height={286}
        />
        <Link href="/game" className="flex justify-center lg:block ">
          <CustomButton borderType={"double"} className="min-w-[150px]  mt-5 relative lg:absolute lg:right-[-60px] px-6 py-3 " >Let&apos;s play !!!</CustomButton>
        </Link>
      </div>
    </main >
  );
}
