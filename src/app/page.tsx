import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-1 items-center ">
        <p>What up world!</p>
        <p className="justify-items-center text-xs">- Henry T Wagner</p>

        <p>A little update test.</p>
      </main>
    </div>
  );
}
