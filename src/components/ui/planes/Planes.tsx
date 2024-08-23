
import Image from "next/image";
import { TituloSecciones } from "../TituloSecciones";

import {
  KommonExtraBold,
  KommonExtraLight,
  KommonSemiBold,
  KommonSemiBoldIt,
} from "@/config/fonts";
import { CardPlanes } from "./CardPlanes";
import ButtonActivar from "./ButtonActivar";

export function Planes() {


  return (
    <section className="bg-white pt-10" id="planes">
      <TituloSecciones
        tituloGris="ELIGE TU"
        tituloMagenta="PLAN"
        parrafo1=""
        parrafo2=""
        plus
        gris
      />
      <div className="flex flex-wrap gap-24 md:gap-10 justify-center items-center my-16 ">
        <CardPlanes url='/planes/just-class' titulo1="JUST CLASS" titulo2="MENSUAL" price="$ 549.°°" parrafo1="Acceso a las" parrafo2="instalaciones de clases" parrafo3="Acceso a todas" parrafo4="nuestras clases" />
        <CardPlanes url='/planes/full-fit' titulo1="FULL FIT" titulo2="MENSUAL" price="$ 849.°°" parrafo1="Acceso completo a" parrafo2="las instalaciones" parrafo3="Acceso a todas" parrafo4="nuestras clases" colorCard="bg-[#c21a83]" colorPrice="text-[#f5eb24]" color />
        <CardPlanes url='/planes/estudiante' titulo1="ESTUDIANTE" titulo2="MENSUAL" price="$ 599.°°" parrafo1="Acceso completo a" parrafo2="las instalaciones" parrafo3="Acceso a todas" parrafo4="nuestras clases" />

      </div>

      {/* <div className="flex flex-row w-full relative justify-center bg-[#f5eb24] py-3 lg:px-16 ">
        <Image
          src="/imgs/10porciento.png"
          alt="Planes"
          width={100}
          height={100}
          className="object-contain absolute -top-5 -left-16 lg:left-0 h-[120px] w-[250px] "
        />
        <div className=" pt-24 sm:py-5 w-10/12 sm:w-11/12  md:w-11/12 md:pl-24  flex flex-wrap flex-row md:flex-nowrap gap-5 md:gap-10 justify-center items-center bg-[#f5eb24]  py-5">
          <div className={`${KommonExtraLight.className} text-[16px] md:text-[13px] lg:text-[20px] font-bold `}
            style={{ lineHeight: "1.2" }}
          >
            <p>
              ¡Aprovecha nuestro nuevo beneficio! Al domiciliar tu tarjeta de
              crédito odébito en tu mensualidad, recibirás automáticamente un
              10% dedescuento. ¡No pierdas la oportunidad de ahorrar en tus
              pagos mensuales!
            </p>
          </div>
          <div className="flex justify-center items-center mt-3 md:mt-0">
            <ButtonActivar />
          </div>
        </div>
      </div> */}
    </section>
  );
}
