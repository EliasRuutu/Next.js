"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TituloSecciones } from "../TituloSecciones";
import {
  KommonExtraBold,
  KommonExtraLight,
  KommonSemiBoldIt,
} from "@/config/fonts";
import { BotonesHorarios } from "./BotonesHorarios";
import { dataHorarios } from "@/data/horarios";
import './styles-bgimage.css';
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

const horarios = dataHorarios;

export function Horarios() {
  const [button, setButton] = useState(0);
  const [animateIndex, setAnimateIndex] = useState< number | null>(null);
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
    Aos.init({ duration: 1000,
      offset: -500,
      once: true
     });
  } ,[])

  return (
    <>
      <section className="relative flex flex-col justify-center items-center py-14 lg:py-20 lg:px-10 " id="horarios">
        <div className="img3"></div>
        <TituloSecciones
          tituloGris="HORARIOS"
          tituloMagenta="DE CLASES"
          parrafo1=""
          parrafo2=""
          plus={true}
        />

        <div className="flex justify-center items-center flex-col md:flex-row w-full md:justify-around lg:justify-center mt-10">
          <div className="flex justify-center items-center w-full mb-10 md:mb-0 md:w-2/12" data-aos="fade-right">
            <div
              className={` ${KommonExtraBold.className} flex flex-wrap  justify-center  md:flex-col  items-start lg:items-end gap-3   [&>button]:py-3  [&>button]:px-4  [&>button]:w-[10rem]  [&>button]:rounded-lg [&>button]:text-start   `}
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

          <div className={`w-full md:w-8/12 `} data-aos="fade-left">
            <div className="flex flex-wrap justify-center items-center gap-10 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {horarios[button].map((horario, index) => (
                  <div
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className={` flex flex-col w-[10rem] h-[10rem] justify-center items-center border-2 border-white rounded-lg hover:cursor-pointer hover:bg-[#c60384] hover:border-2 hover:border-[#c60384] [&>p]:hover:text-white transition-all duration-700 dela ${ animateIndex !== null  ? 'opacity-0' : 'opacity-100'}
                      ${ animateIndex !== null  ? 'animate-fade-up' : ' '} `}
                  >
                    <p className={`text-[#fbed21] text-xl ${KommonSemiBoldIt.className}`}>{horario.titulo}</p>
                    <p className={`text-white font-light ${KommonExtraLight.className}`}>{horario.horarios}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
