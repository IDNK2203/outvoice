"use client";
import { useThemeDispatch, useThemeState } from "@/context/Theme";
import Image from "next/image";
import logoImg from "../../public/assets/logo.svg";
import sunIcon from "../../public/assets/icon-sun.svg";
import moonIcon from "../../public/assets/icon-moon.svg";
import userAvatar from "../../public/assets/image-avatar.jpg";
import Link from "next/link";

export default function Sidebar() {
  const toggleTheme = useThemeDispatch();
  const theme = useThemeState();
  return (
    <>
      <Tbar theme={theme} toggleTheme={toggleTheme} />
      <Sbar theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

function Tbar({ theme, toggleTheme }: { theme: any; toggleTheme: () => void }) {
  return (
    <div
      data-theme={"dark"}
      className='h-16 justify-between flex  bg-[--secondary_bg_500] lg:hidden'
    >
      <div className='h-full w-16 p-4 bg-accent flex items-center justify-center rounded-r-2xl relative group'>
        <div className='w-full rounded-r-2xl h-8 absolute bottom-0 left-0 bg-white opacity-20 group-hover:h-14 transition-h duration-300 z-10'></div>
        <Link
          href='/'
          className='w-full rounded-r-2xl h-full absolute z-20 flex items-center justify-center'
        >
          <Image src={logoImg} alt='App Logo' />
        </Link>
      </div>
      <div className='w-26 h-full justify-between flex'>
        <div className='flex-1basis-20 cursor-pointer flex items-center justify-center px-4'>
          <Image
            onClick={toggleTheme}
            src={theme == "dark" ? sunIcon : moonIcon}
            alt='Theme Logo'
          />
        </div>
        <div className='flex-1 basis-20 flex items-center justify-center border-l-[0.5px] border-l-[#3d4371] px-2'>
          <Image
            className='h-8 w-8 rounded-full hover:ring-2 hover:ring-accent cursor-pointer'
            src={userAvatar}
            alt='user Avatar'
          />
        </div>
      </div>
    </div>
  );
}

function Sbar({ theme, toggleTheme }: { theme: any; toggleTheme: () => void }) {
  return (
    <div
      data-theme={"dark"}
      className='h-full basis-26 justify-between lg:flex flex-col bg-[--secondary_bg_500] rounded-r-2xl hidden'
    >
      <div className='h-24 p-4 bg-accent flex items-center justify-center rounded-r-2xl relative group'>
        <div className='w-full rounded-r-2xl h-14 absolute bottom-0 left-0 bg-white opacity-20 group-hover:h-20 transition-h duration-300 z-10'></div>
        <Link
          href='/'
          className='w-full rounded-r-2xl h-24 absolute z-20 flex items-center justify-center'
        >
          <Image src={logoImg} alt='App Logo' />
        </Link>
      </div>
      <div className=' h-40 justify-between flex flex-col'>
        <div className=' flex-1 cursor-pointer flex items-center justify-center  py-2'>
          <Image
            onClick={toggleTheme}
            src={theme == "dark" ? sunIcon : moonIcon}
            alt='Theme Logo'
          />
        </div>
        <div className='flex-1 flex items-center justify-center border-t-[0.5px] border-t-[#3d4371] py-2'>
          <Image
            className='h-9 w-9 rounded-full hover:ring-2 hover:ring-accent cursor-pointer'
            src={userAvatar}
            alt='user Avatar'
          />
        </div>
      </div>
    </div>
  );
}
