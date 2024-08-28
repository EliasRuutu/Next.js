"use client";

import { KommonSemiBold, KommonExtraBold } from "@/config/fonts";

import { useEffect, useState } from "react";
import { useRouter, } from "next/router";

import { useParams } from 'next/navigation'

import Image from "next/image";
import bgClass from "@/../../public/imgs/classes/bg-class.png";
import spinning from "@/../../public/imgs/classes/Spinning.png";
import man from "@/../../public/imgs/icons/35.png";
import seatEmpty from "@/../../public/imgs/icons/40.png";
import seatDisable from "@/../../public/imgs/icons/39.png";
import seatFull from "@/../../public/imgs/icons/38.png";
import trash from "@/../../public/imgs/icons/45.png";
import shopcart from "@/../../public/imgs/icons/37.png";
import Link from "next/link";

const ClaseList = (clase : string) => {
  switch (clase) {
    case "spinning":
      return "Spinning";
    case "yoga":
      return "Yoga";
    case "cycling":
      return "Cycling";
    case "combat":
      return "Fit Combat";
    case "zumba":
      return "Zumba";
    case "pliates":
      return "Pliates";
    default:
      return "Spinning";
  }
}
const getFutureDateInSpanish = (days: number): string => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days); // Add the input number of days

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  return new Intl.DateTimeFormat('es-ES', options).format(futureDate);
};
const getFutureDateInEnglish = (days: number): string => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days); // Add the input number of days

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  return new Intl.DateTimeFormat('en-US', options).format(futureDate);
};
const getWeekdayInSpanish = (inputDate: Date | string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  };

  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

const getDayAndMonthInSpanish = (inputDate: Date | string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  
  // Replace the month abbreviation to a more readable format
  return formattedDate.replace('.', ''); // Removes the dot from the month abbreviation
};

export default function Home() {

  const params = useParams();
  const clase = params.classes as string;

  const today = new Date();
  const [days, setDays] = useState<number>(0);
  const [selectedNum, setSelectedNum] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(getFutureDateInSpanish(0));
  const [selectedTime, setSelectedTime] = useState<string>('7:00 - 8:00 AM');

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputDays = Number(e.target.value);
  //   setDays(inputDays);
  //   setFutureDate(getFutureDateInSpanish(inputDays));
  // };
  
  const [step, setStep] = useState<number>(1);

  useEffect(()=>{
    setStep(1);
  },[])

  const [total, setTotal] = useState<number>(0);
  const [weekth, setWeekth] = useState<number>(0);
  const [seatCount, setSeatCount] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


  return (
    <>
      <section className="bg-white relative ">
        <div className="absolute inset-0 z-10 top-0 left-0 w-screen h-[300px] bg-black flex flex-col items-center justify-center">
          <div
            className={`${KommonSemiBold.className} outlined-text text-[50px] italic font-bold translate-y-20 translate-x-[-400px]`}
          >
            SELECCIONA TU
          </div>
          <div
            className={`${KommonExtraBold.className} text-[#c60384] text-[64px] italic font-bold translate-y-9 translate-x-[-400px]`}
          >
            CLASE Y HORARIO
          </div>
          {/* <Image width={400} height={400} src={bgClass} alt="bg-class" /> */}
        </div>

        <div className=" w-full min-h-screen flex flex-col lg:flex-row translate-y-[260px] ">
          <div className="min-h-screen lg:w-8/12 flex flex-col justify-start items-start pl-24 gap-5 pt-24">
            <div className="flex gap-12">
              <Image width={48} height={48} src={man} alt="seat" className="w-12 h-12"/>
              <div className="relative w-64">
                <button
                  onClick={toggleDropdown}
                  className="w-full bg-yellow-400 text-black py-4 px-4 rounded inline-flex items-center justify-between text-[24px]"
                >
                  <span>{ClaseList(clase)}</span>
                  <svg
                    className="fill-current h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute text-gray-700 pt-1 w-full">
                    <li>
                      <Link
                        className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./spinning"
                      >
                        Spinning
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./yoga"
                      >
                        Yoga
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./cycling"
                      >
                        Cycling
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./combat"
                      >
                        Fit Combat
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./zumba"
                      >
                        Zumba
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="./pliates"
                      >
                        Pliates
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/*------------------------------------------- STEP 01 -----------------------------------------*/}

            <div className={`w-full ${step == 1 ? "flex" : "hidden"} flex-col justify-start items-start gap-5`}>
              <div className="flex gap-4 items-center">
                <div onClick={() => {weekth > 0 && setWeekth(weekth - 1); weekth > 0 &&setSelectedDate(getFutureDateInSpanish((weekth - 1)* 7 + selectedNum))}} className="w-8 h-8 rounded-full bg-[#c60384] flex justify-center items-center text-white cursor-pointer">&lt;</div>
                <div className="flex border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw]">
                  <div onClick={() => {setSelectedNum(0); setSelectedDate(getFutureDateInSpanish(weekth * 7))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 0 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 1))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(1); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 1))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 1 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 2))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 1))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(2); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 2))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 2 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 3))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 2))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(3); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 3))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 3 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 4))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 3))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(4); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 4))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 4 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 5))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 4))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(5); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 5))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 5 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 6))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 5))}</div>
                  </div>
                  <div onClick={() => {setSelectedNum(6); setSelectedDate(getFutureDateInSpanish(weekth * 7 + 6))}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36 ${selectedNum == 6 && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">{getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + 7))}</div>
                    <div>{getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + 6))}</div>
                  </div>

                </div>
                <div onClick={() => {weekth < 3 && setWeekth(weekth + 1); weekth < 3 && setSelectedDate(getFutureDateInSpanish((weekth + 1)* 7 + selectedNum))}} className="w-8 h-8 rounded-full bg-[#c60384] flex justify-center items-center text-white cursor-pointer">&gt;</div>
              </div>
              <div className="flex flex-wrap mt-12 px-9 justify-between gap-5">
                <div onClick={() => {setSelectedTime('7:00 - 8:00 AM')}}   className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '7:00 - 8:00 AM' && 'bg-[#c60384] text-white'}`}>7:00 - 8:00 AM</div>
                <div onClick={() => {setSelectedTime('8:00 - 9:00 AM')}}   className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '8:00 - 9:00 AM' && 'bg-[#c60384] text-white'}`}>8:00 - 9:00 AM</div>
                <div onClick={() => {setSelectedTime('9:00 - 10:00 AM')}}  className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '9:00 - 10:00 AM' && 'bg-[#c60384] text-white'}`}>9:00 - 10:00 AM</div>
                <div onClick={() => {setSelectedTime('10:00 - 11:00 AM')}} className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '10:00 - 11:00 AM' && 'bg-[#c60384] text-white'}`}>10:00 - 11:00 AM</div>
                <div onClick={() => {setSelectedTime('5:00 - 6:00 PM')}} className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '5:00 - 6:00 PM' && 'bg-[#c60384] text-white'}`}>5:00 - 6:00 PM</div>
                <div onClick={() => {setSelectedTime('6:00 - 7:00 PM')}} className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '6:00 - 7:00 PM' && 'bg-[#c60384] text-white'}`}>6:00 - 7:00 PM</div>
                <div onClick={() => {setSelectedTime('7:00 - 8:00 PM')}} className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '7:00 - 8:00 PM' && 'bg-[#c60384] text-white'}`}>7:00 - 8:00 PM</div>
                <div onClick={() => {setSelectedTime('8:00 - 9:00 PM')}} className={`border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white] ${selectedTime == '8:00 - 9:00 PM' && 'bg-[#c60384] text-white'}`}>8:00 - 9:00 PM</div>
              </div>
            </div>

            {/*------------------------------------------- STEP 02 -----------------------------------------*/}

            <div className={`w-full ${step == 2 ? "flex" : "hidden"} flex-col justify-start items-start gap-5`}>
              <div className="flex gap-4 items-center">
                <div className={`${selectedTime.includes('AM')?"flex":"hidden"} border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw]`}>
                  <div onClick={() => {setSelectedTime('7:00 - 8:00 AM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '7:00 - 8:00 AM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">7:00 - 8:00 AM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('8:00 - 9:00 AM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '8:00 - 9:00 AM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">8:00 - 9:00 AM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('9:00 - 10:00 AM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '9:00 - 10:00 AM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">9:00 - 10:00 AM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('10:00 - 11:00 AM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '10:00 - 11:00 AM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">10:00 - 11:00 AM</div>
                  </div>

                </div>
                <div className={`${selectedTime.includes('PM')?"flex":"hidden"} border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw]`}>
                  <div onClick={() => {setSelectedTime('5:00 - 6:00 PM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '5:00 - 6:00 PM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">5:00 - 6:00 PM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('6:00 - 7:00 PM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '6:00 - 7:00 PM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">6:00 - 7:00 PM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('7:00 - 8:00 PM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '7:00 - 8:00 PM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">7:00 - 8:00 PM</div>
                  </div>
                  <div onClick={() => {setSelectedTime('8:00 - 9:00 PM')}}  className={`cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56 ${selectedTime == '8:00 - 9:00 PM' && "border-b-2 border-[#fbee21]"}`}>
                    <div className="font-bold">8:00 - 9:00 PM</div>
                  </div>

                </div>
              </div>
              <div className="flex gap-20 items-center">
                <div className="flex gap-4 items-center">
                  <Image width={30} height={30} src={seatFull} alt="logo"/>
                  <div className={`${KommonSemiBold.className} text-[24px]`}>SELECCIONADO</div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image width={30} height={30} src={seatDisable} alt="logo"/>
                  <div className={`${KommonSemiBold.className} text-[24px]`}>OCUPADO</div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image width={30} height={30} src={seatEmpty} alt="logo"/>
                  <div className={`${KommonSemiBold.className} text-[24px]`}>DISPONIBLE</div>
                </div>
              </div>
              <hr className="bg-black h-[4px] mt-14 w-full"/>
              <div className="flex flex-row flex-wrap gap-5">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((item, index) => {
                  return (
                    <div key={index} className="w-[9%]">
                      <Image width={30} height={30} src={seatEmpty} className="w-full" alt="logo"/>
                    </div>
                  )
                })}
              </div>
            </div>



          </div>
          <div className=" lg:min-h-screen w-full lg:w-4/12   pt-32 pb-24 px-10 flex flex-col items-start gap-5 font-bold">
            <div className="bg-[#fbee21] w-full 2xl:w-[80%] rounded-lg h-[100px] px-6 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Image
                  src={shopcart}
                  alt="logo"
                  width={10}
                  height={10}
                  className="w-10 h-10"
                />
                <div
                  className={`${KommonExtraBold.className} text-[32px] font-bold`}
                >
                  Tú carrito
                </div>
              </div>
              <div
                className={`${KommonExtraBold.className} text-[32px] font-bold`}
              >
                $ 0. °°
              </div>
            </div>
            <div className="bg-white border-gray-950 border-2 w-full 2xl:w-[80%] rounded-md h-[45vh] px-6 flex flex-col gap-3 overflow-auto mb-64 xl:mb-54">
              <div className="flex flex-col">
                <div
                  className={`${KommonExtraBold.className} text-[24px] font-bold`}
                >
                  CLASE
                </div>
                <div className={`${KommonSemiBold.className} text-[24px]`}>
                {ClaseList(clase)}
                </div>
              </div>
              <hr className="bg-[#dad9d8] h-[6px] w-full" />
              <div className="flex flex-col">
                <div
                  className={`${KommonExtraBold.className} text-[24px] font-bold`}
                >
                  FECHA Y HORA
                </div>
                <div className={`${KommonSemiBold.className} text-[24px]`}>
                  {selectedDate} , {selectedTime}
                </div>
              </div>
              <hr className="bg-[#dad9d8] h-[6px] w-full" />
              <div className="flex flex-col">
                <div
                  className={`${KommonExtraBold.className} text-[24px] font-bold`}
                >
                  {`BICICLETA(${seatCount})`}
                </div>
                <div className="w-full">
                  {seatCount==0
                    ?(<div className={`${KommonSemiBold.className} text-[22px] flex gap-1 items-center`}>
                    <Image width={20} height={20} src={seatFull} alt="seat" className="w-6 h-6"/>
                    {`No haz seleccionado tus lugares`}
                  </div>)
                  :(
                    <></>
                  )}
                </div>
                <button className={`${KommonExtraBold.className} text-[24px] font-bold text-white bg-[#c60384] rounded-md py-2 mt-5`} onClick={() => {step < 3 &&setStep(step=>step + 1)}}>
                  CONTINUAR
                </button>
                <button className={`${KommonExtraBold.className} text-[24px] font-bold bg-white rounded-md py-2`} onClick={() => {step > 1 &&setStep(step=>step - 1)}}>
                  VOLVER
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
