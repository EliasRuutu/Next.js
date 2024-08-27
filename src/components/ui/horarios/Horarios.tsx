"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import shopcart from "@/../../public/imgs/classes/shopcart.webp";
import { TituloSecciones } from "../TituloSecciones";
import { Link, Button } from "react-scroll";
import {
  KommonExtraBold,
  KommonExtraLight,
  KommonSemiBoldIt,
} from "@/config/fonts";
import { BotonesHorarios } from "./BotonesHorarios";
import { dataHorarios } from "@/data/horarios";
import "./styles-bgimage.css";
import Aos from "aos";
import { set } from "zod";

const botones = [
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
  "DOMINGO",
];
interface HorariosItem {
  selected: boolean;
  titulo: string;
  horarios: string;
}

export function Horarios() {
  const [horarios, setHorarios] = useState<HorariosItem[][]>(dataHorarios);
  const [button, setButton] = useState(0);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  //bauncer

  const debounceRef = useRef<NodeJS.Timeout>();

  const handleClick = (index: number) => {
    setButton(index);
    setAnimateIndex(index);
    setTimeout(() => {
      setAnimateIndex(null);
    }, 1000);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, offset: -500, once: true });
  }, []);

  const selectHorario = (button: number, index: number) => {
    const virtHoratios: HorariosItem[][] = [...horarios];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < horarios[button].length; j++) {
        if (i == button && j == index)
          virtHoratios[i][j].selected = !horarios[i][j].selected;
        else virtHoratios[i][j].selected = horarios[i][j].selected;
        virtHoratios[i][j].titulo = horarios[i][j].titulo;
        virtHoratios[i][j].horarios = horarios[i][j].horarios;
      }
    }

    setHorarios(virtHoratios);
  };
  const [sidenav, setSidenav] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This code will only run on the client side
    const sidenavElement = document.getElementById("sidenav");
    setSidenav(sidenavElement);
  }, []);
  const openSideNav = () => {
    const sidenavElement = document.getElementById("sidenav");
    sidenavElement?.classList.remove("w-[0px]");
    sidenavElement?.classList.add("md:w-[700px]");
    sidenavElement?.classList.add("w-full");
    setSidenav(sidenavElement);
  };
  const closeSideNav = () => {
    const sidenavElement = document.getElementById("sidenav");
    sidenavElement?.classList.remove("md:w-[700px]");
    sidenavElement?.classList.remove("w-full");
    sidenavElement?.classList.add("w-[0px]");
    setSidenav(sidenavElement);
  };

  useEffect(() => {
    // This code will only run on the client side
    const sidenavElement = document.getElementById("sidenav");
    setSidenav(sidenavElement);

    // Set up the window click event listener
    const handleWindowClick = (event: MouseEvent) => {
      const shopcartBtnElement: any = document.getElementById("shopcartBtn");

      // Check if the clicked element is not the horarios element and not a descendant of horarios
      if (
        sidenavElement &&
        !sidenavElement.contains(event.target as Node) &&
        !shopcartBtnElement.contains(event.target as Node)
      ) {
        closeSideNav();
      }
    };

    window.addEventListener("click", handleWindowClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);
  return (
    <>
      <section
        className="relative flex flex-col justify-center items-center py-14 lg:py-20 lg:px-10 "
        id="horarios"
        // onClick={() => {const sidenav : any = document.getElementById("sidenav"); sidenav.style.width = "0px";}}
      >
        <div className=""></div>
        <TituloSecciones
          tituloGris="HORARIOS"
          tituloMagenta="DE CLASES"
          parrafo1=""
          parrafo2=""
          plus={true}
        />

        <div className="flex justify-center items-center flex-col xl:flex-row w-full lg:justify-center mt-10">
          <div
            className="flex justify-center items-center w-full mb-10 xl:mb-0 xl:w-2/12"
            data-aos="fade-right"
          >
            <div
              className={` ${KommonExtraBold.className} flex flex-wrap  justify-center  xl:flex-col  items-start xl:items-end gap-3   [&>button]:py-3  [&>button]:px-4  [&>button]:w-[10rem]  [&>button]:rounded-lg [&>button]:text-start   `}
            >
              {botones.map((boton, index) => (
                <BotonesHorarios
                  key={index}
                  titulo={boton}
                  index={button}
                  number={index}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>

          <div className={`w-full lg:w-8/12 `} data-aos="fade-left">
            <div className="flex flex-wrap justify-center items-center gap-10 w-full">
              <div className="grid grid-cols-2  md:grid-cols-4 gap-5 ">
                {horarios[button].map((horario, index) => (
                  <div
                    key={index}
                    className={`relative ${
                      index % 4 == 1 || index % 4 == 0 ? "mt-7" : "mt-0"
                    } md:mt-7 lg:mt-0`}
                  >
                    <div
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => selectHorario(button, index)}
                      className={` flex flex-col w-[10rem] h-[4rem] justify-center items-center  rounded-lg  ${
                        horario.titulo != "" &&
                        horario.horarios != "" &&
                        `hover:cursor-pointer hover:bg-[#c60384] hover:border-2 hover:border-[#c60384] [&>p]:hover:text-white`
                      } transition-all duration-700 dela ${
                        animateIndex !== null ? "opacity-0" : "opacity-100"
                      }
                    ${
                      horario.selected == true &&
                      horario.titulo != "" &&
                      horario.horarios != ""
                        ? "bg-[#c60384] border-2 border-[#c60384] [&>p]:text-white"
                        : "border-2 border-white"
                    } 
                    ${animateIndex !== null ? "animate-fade-up" : " "}
                    `}
                    >
                      <p
                        className={`text-[#fbed21] text-xl ${KommonSemiBoldIt.className}`}
                      >
                        {horario.titulo}
                      </p>
                      <p
                        className={`text-white font-light ${KommonExtraLight.className}`}
                      >
                        {horario.horarios}
                      </p>
                    </div>
                    {index % 4 == 0 ? (
                      <p
                        className={`text-white absolute top-[-65%] left-3 lg:left-[-120px] lg:top-[20%] text-[24px] ${
                          KommonSemiBoldIt.className
                        } ${animateIndex !== null ? "opacity-0" : "opacity-100"}
                          ${animateIndex !== null ? "animate-fade-up" : " "}`}
                      >{`${index / 4 + 1} week`}</p>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          id="shopcartBtn"
          className="absolute right-16 top-[50%] text-white w-10 "
          onClick={openSideNav}
        >
          <Image width={100} height={100} src={shopcart} alt="shopcart" />
        </button>
        <div
          id="sidenav"
          className="absolute right-0 top-0 h-full w-[0px] bg-slate-950 overflow-x-hidden overflow-y-auto duration-500 py-[20px]"
        >
          <div className="px-[40px] text-[50px] text-white  flex justify-between items-center">
            <div
              className="cursor-pointer hover:text-[#fbed21]"
              onClick={closeSideNav}
            >
              &times;
            </div>
            <button
              className=" bg-white px-[12px] text-[20px] py-2 text-black rounded-sm md:rounded-xl hover:text-white hover:bg-[#c60385] hover:shadow-lg"
            >
              Select Seat
            </button>
          </div>
          <div className="w-full flex flex-col p-[20px]">
            {horarios.map((item, id1) => (
              <div key={id1} className="w-full flex flex-col">
                {item.map((horario, id2) => (
                  <div className="w-full flex flex-col " key={id2}>
                    {horario.selected == true &&
                      horario.titulo != "" &&
                      horario.horarios != "" && (
                        <div className="flex justify-between m-[12px]">
                          <p className="text-white text-left w-[25%]">
                            {Math.ceil((id2 + 1) / 4) + " " + botones[id1]}
                          </p>
                          <p className="text-[#fbed21] text-left w-[25%]">
                            {horario.titulo}
                          </p>
                          <p className="text-white text-left w-[25%]">
                            {horario.horarios}
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
