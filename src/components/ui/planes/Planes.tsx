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
import Slider from "react-slick";
import { useState, useEffect } from "react";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={className+ " translate-x-10"} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}
export function Planes() {
  const [viewportWidth, setViewportWidth] = useState<number>(600);
  const [viewportHeight, setViewportHeight] = useState<number>(600);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    // Establecer los valores iniciales
    handleResize();

    // Agregar el listener para el redimensionamiento de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 3,
    swipeToSlide: true,

    focusOnSelect: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  if (viewportWidth < 430) {
    settings.slidesToShow = 1;
    settings.centerPadding = "25px";
  } else if (viewportWidth < 500) {
    settings.slidesToShow = 1;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 640) {
    settings.slidesToShow = 1;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 768) {
    settings.slidesToShow = 1;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 1024) {
    settings.slidesToShow = 2;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 1024) {
    settings.slidesToShow = 2;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 1280) {
    settings.slidesToShow = 3;
    settings.centerPadding = "60px";
  } else if (viewportWidth < 1536) {
    settings.slidesToShow = 3;
    settings.centerPadding = "60px";
  }
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
      <div className="mx-[10px] flex flex-grow justify-center">
        <div className="w-full px-10">
        <Slider {...settings}>
          <CardPlanes
            url="/planes/just-class"
            titulo1="JUST CLASS"
            titulo2="MENSUAL"
            price="$ 549.°°"
            parrafo1="Acceso a las"
            parrafo2="instalaciones de clases"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
          />
          <CardPlanes
            url="/planes/full-fit"
            titulo1="FULL FIT"
            titulo2="MENSUAL"
            price="$ 849.°°"
            parrafo1="Acceso completo a"
            parrafo2="las instalaciones"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
            colorCard="bg-[#c21a83]"
            colorPrice="text-[#f5eb24]"
            color
          />
          <CardPlanes
            url="/planes/estudiante"
            titulo1="ESTUDIANTE"
            titulo2="MENSUAL"
            price="$ 599.°°"
            parrafo1="Acceso completo a"
            parrafo2="las instalaciones"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
          />
          <CardPlanes
            url="/planes/trimestral"
            titulo1="TRIMESTRAL"
            titulo2=""
            price="$ 2,229.°°"
            parrafo1="Acceso completo a"
            parrafo2="las instalaciones"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
          />
          <CardPlanes
            url="/planes/semestral"
            titulo1="SEMESTRAL"
            titulo2=""
            price="$ 4,199.°°"
            parrafo1="Acceso completo a"
            parrafo2="las instalaciones"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
          />
          <CardPlanes
            url="/planes/anual"
            titulo1="ANUAL"
            titulo2=""
            price="$ 7,199.°°"
            parrafo1="Acceso completo a"
            parrafo2="las instalaciones"
            parrafo3="Acceso a todas"
            parrafo4="nuestras clases"
          />
        </Slider>
        </div>
        
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
