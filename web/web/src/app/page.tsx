import { DialogComponent } from "@/components/DialogComponent";
import GlobeComponent from "@/components/GlobeComponent";
import InfiniteCardsComponent from "@/components/InfiniteCardComponent";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col bg-zinc-900">
      <div className=" flex flex-col w-full h-screen ">
        
      <AuroraBackground>
      <div className=" py-6 flex flex-row px-4 gap-4 bg-tra">
        <h1 className=" text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-extrabold">
          EduPro.inc
        </h1>
        </div>
      {/* <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"> */}
      <div className=" flex flex-col justify-center z-20 items-center ">
        
        <div className=" justify-center items-center flex flex-col">
        <h2 className=" w-full text-lg text-end font-extrabold py-2 px-4 rounded-lg bg-slate-50 text-zinc-950">by i_love_models</h2>
        <h1 className=" text-9xl font-black text-slate-50  text-center">
          Your education <br /> is our priority
        </h1>
      </div>
      <div className=" flex py-12 md:flex-row flex-col flex-wrap gap-5">
        {/* <DialogComponent/> */}
        <Link href={'/login'}>
        <Button  className=" !h-fit text-4xl py-4 px-6 !rounded-2xl !bg-slate-50 hover:!bg-transparent border border-slate-50 hover:!text-slate-50 !text-zinc-900 font-extrabold ">Get Started</Button>
        </Link>
        {/* <Link href={"/room/teacher1?room=34"} className=" py-2 px-4 rounded-xl bg-slate-50 text-zinc-950 border border-slate-50 hover:bg-transparent hover:text-slate-50 transition-all ease-in-out delay-75 duration-300 text-xl font-semibold">Go to video chat component</Link>
        <a href="/" target="_blank" className=" py-2 px-4 rounded-xl bg-slate-50 text-zinc-950 border border-slate-50 hover:bg-transparent hover:text-slate-50 transition-all ease-in-out delay-75 duration-300 text-xl font-semibold">Go to Repository</a> */}
      </div>
      </div>
      </AuroraBackground>
      <div className=" absolute  left-0 z-0  right-0 m-auto h-full w-3/5 flex justify-center items-center">
        <GlobeComponent/>
      </div>
      </div>
      {/* </div> */}
      <div className=" flex flex-col min-h-screen w-full justify-center items-center">
        <h1 className=" pt-6 pb-32 text-7xl font-black text-slate-50  text-center">Our Testimonials</h1>
        <InfiniteCardsComponent/>
      </div>
    </main>
  );
}
