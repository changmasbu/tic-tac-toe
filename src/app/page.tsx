import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <div className="relative">
        <Image
          className="animate-wobble"
          src="/tictactoe.svg"
          alt="Tic-Tac-Toe Image"
          width={711}
          height={144}
        />
        <Link href="/game">
          <button className="mt-5 absolute right-[-60px] px-6 py-3 text-white bg-black border border-white transition-transform duration-400 hover:scale-125">
            <span className="absolute inset-0 translate-x-1 translate-y-1 bg-black border border-white"></span>
            <span className="font-sans relative">Let&apos;s play !!!</span>
          </button>
        </Link>
      </div>
    </main>
  );
}
