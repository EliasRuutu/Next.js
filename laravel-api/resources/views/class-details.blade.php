<!DOCTYPE html>
<html>

<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
        .custom-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1em;
        }

        .custom-select-small {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(198, 3, 132)' viewBox='0 0 24 24' stroke='none'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-5 7-5-7 '%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.5rem center;
            background-size: 2em;
            position: relative;
        }
    </style>
</head>

<body class="bg-white">
    <div class=" w-full lg:h-[95vh] overflow-y-hidden flex flex-col lg:flex-row">
        <div class="w-full lg:w-8/12 flex flex-col justify-start items-start pl-12 lg:pl-24 pr-12 lg:pr-0 gap-5 {{ $step == 3 ? 'pt-2' : 'pt-12'}}">
            <div class="h-[600px] w-full">
                <!-- dropdown button -->
                <!-- <div class="flex gap-12 "> -->
                <div class=" gap-12 {{ $step < 3 ? 'flex' : 'hidden'}} step-u3">
                    <img src="{{asset('imgs/icons/35.png')}}" width="56" alt="seat">
                    <div class="relative ">
                        <select name="Classes" id="classes" class="custom-select w-[180px] text-[24px] rounded-lg pl-4 pr-12 py-3 bg-yellow-300 text-black cursor-pointer">
                            <option value="spinning" class="bg-white hover:bg-yellow-300">Spinning</option>
                            <option value="cycling" class="bg-white hover:bg-yellow-300">Cycling</option>
                            <option value="yoga" class="bg-white hover:bg-yellow-300">Yoga</option>
                            <option value="combat" class="bg-white hover:bg-yellow-300">Fit Combat</option>
                            <option value="zumba" class="bg-white hover:bg-yellow-300">Zumba</option>
                            <option value="pliates" class="bg-white hover:bg-yellow-300">Pliates</option>
                        </select>
                    </div>
                </div>
                <!-- step 1 -->
                <div class="{{ $step == 1 ? 'flex' : 'hidden'}} flex-col justify-start items-start gap-5 mt-6 step-1">
                    <div class="flex gap-4 items-center">
                        <div id="prev-btn" class="w-8 h-8 rounded-full bg-[#c60384] flex justify-center items-center text-white cursor-pointer">&lt;</div>
                        <div class="flex border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw] select-day-block">
                            @for ($i = 1; $i <= 7; $i++)
                                <div id="selected-day-{{$i}}" class="selected-day-block cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36">
                                <div class="font-bold">{{$getWeekdayInSpanish($getFutureDateInEnglish($weekth * 7 + $i - 1))}}</div>
                                <div>{{$getDayAndMonthInSpanish($getFutureDateInEnglish($weekth * 7 + $i - 1))}}</div>
                        </div>
                        @endfor
                    </div>
                    <div id="next-btn" class="w-8 h-8 rounded-full bg-[#c60384] flex justify-center items-center text-white cursor-pointer">&gt;</div>
                </div>
                <div class="flex flex-wrap mt-12 px-9 justify-between gap-5">
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">7:00 - 8:00 AM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">8:00 - 9:00 AM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">9:00 - 10:00 AM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">10:00 - 11:00 AM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">5:00 - 6:00 PM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">6:00 - 7:00 PM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">7:00 - 8:00 PM</div>
                    <div class="time-select-block  border-2 border-[#dad9d8] rounded-md p-4 text-[24px] w-[230px] cursor-pointer hover:bg-[#c60384] hover:text-[white]">8:00 - 9:00 PM</div>
                </div>
            </div>

            <!-- step 2 -->
            <div class="w-full   {{ $step == 2 ? 'flex' : 'hidden'}}    flex-col justify-start items-start mt-6 gap-5 step-2">
                <div class="flex gap-4 items-center">
                    <div id="am-block" class="border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw] flex">
                        <div id="am1" class=" am font-bold cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            7:00 - 8:00 AM
                        </div>
                        <div id="am2" class=" am font-bold cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            8:00 - 9:00 AM
                        </div>
                        <div id="am3" class=" am font-bold  cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            9:00 - 10:00 AM
                        </div>
                        <div id="am4" class=" am font-bold cursor-pointer flex flex-col justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            10:00 - 11:00 AM
                        </div>
                    </div>
                    <div id="pm-block" class="border-b-2 border-[#dad9d8] overflow-x-auto w-[70vw] lg:w-[53vw] flex">
                        <div id="pm1" class=" pm cursor-pointer flex flex-col font-bold justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            5:00 - 6:00 PM
                        </div>
                        <div id="pm2" class=" pm cursor-pointer flex flex-col font-bold justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            6:00 - 7:00 PM
                        </div>
                        <div id="pm3" class=" pm cursor-pointer flex flex-col font-bold justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            7:00 - 8:00 PM
                        </div>
                        <div id="pm4" class=" pm cursor-pointer flex flex-col font-bold justify-center items-center text-[24px] py-2 w-56 min-w-56">
                            8:00 - 9:00 PM
                        </div>
                    </div>
                </div>
                <div class="flex gap-5 flex-wrap items-center">
                    <div class="flex gap-4 mr-10 items-center">
                        <img width="30" height="30" src="{{asset('imgs/icons/38.png')}}" alt="logo">
                        <div class="italic text-[20px]" style="font-family: KommonExtraBold;">SELECCIONADO</div>
                    </div>
                    <div class="flex gap-4 mr-10 items-center">
                        <img width="30" height="30" src="{{asset('imgs/icons/39.png')}}" alt="logo">
                        <div class="italic text-[20px]" style="font-family: KommonExtraBold;">OCUPADO</div>
                    </div>
                    <div class="flex gap-4 items-center">
                        <img width="30" height="30" src="{{asset('imgs/icons/40.png')}}" alt="logo">
                        <div class="italic text-[20px]" style="font-family: KommonExtraBold;">DISPONIBLE</div>
                    </div>
                </div>
                <hr class="bg-black h-[4px] mt-14 w-full" />
                <div class="flex flex-row flex-wrap w-full justify-between relative">

                    @foreach($seats as $index => $item)
                    @if($index == 2 || $index == 6 || $index == 10)
                    <div class="w-[11%]"></div>
                    <div class="w-[11%]"></div>
                    <div class="w-[11%]"></div>
                    <div class="w-[11%]"></div>
                    <div class="w-[11%]"></div>
                    @endif
                    <div id="seat-{{$index}}" class="w-[11%] seats">
                        @if($item === 'Empty')
                        <img width="50" height="50"
                            src="{{asset('imgs/icons/40.png')}}"
                            alt="logo"
                            class="seat-Empty {{ $seatsDirection[$index] === 'left' ? 'transform scale-x-[-1]' : '' }} cursor-pointer ">
                        @elseif($item === 'Full')
                        <img width="50" height="50"
                            src="{{asset('imgs/icons/38.png')}}"
                            alt="logo"
                            class="seat-Full {{ $seatsDirection[$index] === 'left' ? 'transform scale-x-[-1]' : '' }} cursor-pointer">
                        @else
                        <img width="50" height="50"
                            src="{{asset('imgs/icons/39.png')}}"
                            alt="logo"
                            class="seat-Disable {{ $seatsDirection[$index] === 'left' ? 'transform scale-x-[-1]' : '' }}">
                        @endif
                    </div>
                    @endforeach

                    <div class="absolute -top-2 left-[50%] translate-x-[-50%] flex flex-col gap-2 justify-center items-center">
                        <div class="italic text-[20px]" style="font-family: KommonExtraBold;">FRENTE</div>
                        <div class="bg-[#fbee21] rounded-lg w-44 h-24 "></div>
                    </div>
                </div>
            </div>

            <!-- step3 -->
            <div class="w-full  {{ $step == 3 ? 'flex' : 'hidden'}} flex-col 2xl:pr-[40px] xl:pr-[20px] pr-[0px] step-3">
                <div class="w-full flex flex-col gap-4 ">
                    <div class=" flex justify-between items-center">
                        <div class="flex gap-4 items-center">
                            <img width={25} height={25} src="{{asset('imgs/icons/42.png')}}" alt="seat" class="w-6 h-6">
                            <div class="flex flex-col gap-0">
                                <div class="text-[#dad9d8] text-[22px] font-bold" style="font-family: KommonExtraBold;">Paso 1</div>
                                <div class="text-black text-[22px] font-bold" style="font-family: KommonExtraBold;">DATOS PERSONALES</div>
                            </div>
                        </div>
                        @if($profile == true)
                        <img width={25} height={25} src="{{asset('imgs/icons/44.png')}}" alt="seat" class="w-6 h-6 cursor-pointer">
                        @else
                        <img width={25} height={25} src="{{asset('imgs/icons/43.png')}}" alt="seat" class="w-6 h-6 cursor-pointer">
                        @endif
                    </div>
                    <hr class="bg-[#dad9d8] h-[6px] w-full" />
                    @if($profile == true)
                    <div class="flex flex-row justify-between items-center gap-8 text-[20px]">
                        <div class="flex flex-1 relative">
                            <input type="text" class=" h-12 rounded-lg outline outline-[#dad9d8] px-4 w-full">
                            <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                        </div>
                        <div class="flex flex-1 relative">
                            <input type="text" class=" h-12 rounded-lg outline outline-[#dad9d8] px-4 w-full">
                            <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                        </div>
                        <div class="flex flex-1 relative">
                            <input type="text" class=" h-12 rounded-lg outline outline-[#dad9d8] px-4 w-full">
                            <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                        </div>
                    </div>
                    <div class="w-full relative">
                        <input type="text" class="flex w-full text-[20px] py-2 px-4 rounded-lg outline outline-[#dad9d8] ">
                        <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                    </div>
                    <button class="w-full bg-[#fbee21] h-12 rounded-lg text-[24px]" style="font-family: KommonExtraBold;">CONTINUAR</button>
                    @endif
                </div>
                <div class="w-full flex flex-col gap-4 ">
                    <div class=" flex justify-between items-center">
                        <div class="flex gap-4 items-center">
                            <img width={25} height={25} src="{{asset('imgs/icons/42.png')}}" alt="seat" class="w-6 h-6">
                            <div class="flex flex-col gap-0">
                                <div class="text-[#dad9d8] text-[22px] font-bold" style="font-family: KommonExtraBold;">Paso 2</div>
                                <div class="text-black text-[22px] font-bold" style="font-family: KommonExtraBold;">PAGAR</div>
                            </div>
                        </div>
                        @if($profile2 == true)
                        <img width={25} height={25} src="{{asset('imgs/icons/44.png')}}" alt="seat" class="w-6 h-6 cursor-pointer">
                        @else
                        <img width={25} height={25} src="{{asset('imgs/icons/43.png')}}" alt="seat" class="w-6 h-6 cursor-pointer">
                        @endif
                    </div>
                    <hr class="bg-[#dad9d8] h-[6px] w-full" />
                    @if($profile2 == true)
                    <div class="flex flex-row justify-between items-center gap-8 text-[20px]">
                        <div class="flex flex-[7] relative">
                            <input type="text" class=" h-12 rounded-lg outline outline-[#dad9d8] px-4 w-full">
                            <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                        </div>
                        <div class="flex flex-1 relative">
                            <select name="Classes" id="classes" class="custom-select-small text-[20px] text-[#c60384] rounded-lg pl-2 py-3 bg-[#f6f3f3] cursor-pointer w-full">
                                <option value="Mes">Mes</option>
                                <option value="Enero">Enero</option>
                                <option value="Febrero">Febrero</option>
                                <option value="Marzo">Marzo</option>
                                <option value="Abril">Abril</option>
                                <option value="Mayo">Mayo</option>
                                <option value="Junio">Junio</option>
                                <option value="Julio">Julio</option>
                                <option value="Agosto">Agosto</option>
                                <option value="Septiembre">Septiembre</option>
                                <option value="Octubre">Octubre</option>
                                <option value="Noviembre">Noviembre</option>
                                <option value="Diciembre">Diciembre</option>
                            </select>
                        </div>
                        <div class="flex flex-1 relative">
                            <select name="Classes" id="classes" class="custom-select-small text-[20px] text-[#c60384] rounded-lg pl-2 py-3 bg-[#f6f3f3] cursor-pointer w-full">
                                <option value="Año">Año</option>
                                <option value="Año9">2029</option>
                                <option value="Año8">2028</option>
                                <option value="Año7">2027</option>
                                <option value="Año6">2026</option>
                            </select>
                        </div>
                        <div class="flex flex-1 relative">
                            <input type="text" class=" h-12 rounded-lg outline outline-[#dad9d8] px-4 w-full">
                            <img width={25} height={25} src="{{asset('imgs/icons/48.png')}}" alt="seat" class="w-6 h-6 absolute top-[50%] translate-y-[-50%] right-3">
                        </div>
                    </div>
                    <div class="w-full relative flex items-center gap-6">
                        <input type="checkbox" class="w-14 h-14">
                        <div class="text-[20px]">Estoy de acuerdo con los Términos y condiciones, políticas de cancelación y de promoción así como los servicios que se muestran en el desglose de mi compra son los que solicito.</div>
                    </div>
                    <button class="w-full bg-[#fbee21] h-12 rounded-lg text-[24px]" style="font-family: KommonExtraBold;">CONTINUAR</button>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-4/12 pt-12 pb-24 px-10 flex flex-col items-start gap-5 font-bold">
        <div class="bg-[#fbee21] w-full 2xl:w-[90%] rounded-lg h-[100px] px-6 flex justify-between items-center">
            <div class="flex gap-4 items-center">
                <img
                    src="{{asset('imgs/icons/37.png')}}"
                    alt="logo"
                    width="10"
                    height="10"
                    class="w-10 h-10">
                <div
                    style="font-family: KommonExtraBold;"
                    class="text-[32px] font-bold">
                    Tú carrito
                </div>
            </div>
            <div

                style="font-family: KommonExtraBold;"
                class="text-[32px] font-bold">
                $ 0. °°
            </div>
        </div>
        <div class="bg-white border-gray-950 border-2 w-full 2xl:w-[90%] max-h-[380px] lg:max-h-[380px] rounded-md px-6 flex flex-col gap-3 overflow-auto ">
            <div class="flex flex-col">
                <div
                    style="font-family: KommonExtraBold;"
                    class="text-[24px] font-bold">
                    CLASE
                </div>
                <div
                    style="font-family: KommonSemiBold;"
                    class="text-[20px]">
                    Spinning
                </div>
            </div>
            <hr class="bg-[#dad9d8] h-[6px] w-full" />
            <div class="flex flex-col">
                <div
                    style="font-family: KommonExtraBold;"
                    class="text-[24px] font-bold">
                    FECHA Y HORA
                </div>
                <div
                    style="font-family: KommonSemiBold;"
                    class="text-[20px]">
                    <span id="selectedDate">{{$selectedDate}}</span> , <span id="selectedTime">{{$selectedTime}}</span>
                </div>
            </div>
            <hr class="bg-[#dad9d8] h-[6px] w-full" />
            <div class="flex flex-col">
                <div
                    style="font-family: KommonExtraBold;"
                    class="text-[24px] font-bold">
                    BICICLETA ({{$seatCount}})
                </div>
                <div class="w-full">
                    @foreach($seats as $index => $item)
                        @if($item === 'Empty')
                        <div
                            style="font-family: KommonSemiBold;"
                            class="text-[20px] flex gap-1 items-center">
                            <img width={20} height={20} src="{{asset('imgs/icons/38.png')}}" alt="seat" class="w-6 h-6">
                            No haz seleccionado tus lugares
                        </div>
                        @endif
                    @endforeach
                </div>
                <button
                    id="step-12"
                    style="font-family: KommonExtraBold;"
                    class=" {{ $step == 1 ? 'flex' : 'hidden'}} justify-center items-center text-[24px] font-bold text-white bg-[#c60384] rounded-md py-2 mt-5 step-1">
                    CONTINUAR
                </button>
                <a
                    href="javascript:gotoHome()"
                    style="font-family: KommonExtraBold;"
                    class=" {{ $step == 1 ? 'flex' : 'hidden'}} justify-center items-center text-[24px] font-bold bg-white rounded-md py-2 step-1">
                    VOLVER
                </a>

                <button
                    id="step-23"
                    style="font-family: KommonExtraBold;"
                    class=" {{ $step == 2 ? 'flex' : 'hidden'}} justify-center items-center text-[24px] font-bold text-white bg-[#c60384] rounded-md py-2 mt-5 step-2">
                    CONTINUAR
                </button>
                <button
                    id="step-21"
                    style="font-family: KommonExtraBold;"
                    class="  {{ $step == 2 ? 'flex' : 'hidden'}} justify-center items-center text-[24px] font-bold bg-white rounded-md py-2 step-2">
                    VOLVER
                </button>
                <hr class="bg-[#dad9d8] h-[6px] mt-14 w-full step-3  {{ $step == 3 ? 'flex' : 'hidden'}}" />
                <div class="justify-between text-[#c60384] mb-4 step-3  {{ $step == 3 ? 'flex' : 'hidden'}}">
                    <div
                        style="font-family: KommonExtraBold;"
                        class="text-[32px] font-bold">
                        TOTAL
                    </div>
                    <div

                        style="font-family: KommonExtraBold;"
                        class="text-[32px] font-bold">
                        $ 100. °°
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script lanugage="javascript">

        const gotoHome = () => {
            window.parent.location.href = "<?= $homeUrl ?>";
        }

        const getFutureDateInSpanish = (days) => {
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + days); // Add the input number of days

            const options = {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            };

            return new Intl.DateTimeFormat('es-ES', options).format(futureDate);
        };
        const getFutureDateInEnglish = (days) => {
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + days); // Add the input number of days

            const options = {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            };

            return new Intl.DateTimeFormat('en-US', options).format(futureDate);
        };
        const getWeekdayInSpanish = (inputDate) => {
            const date = new Date(inputDate);
            const options = {
                weekday: 'long',
            };

            return new Intl.DateTimeFormat('es-ES', options).format(date);
        };

        const getDayAndMonthInSpanish = (inputDate) => {
            const date = new Date(inputDate);
            const options = {
                day: 'numeric',
                month: 'short',
            };

            const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

            // Replace the month abbreviation to a more readable format
            return formattedDate.replace('.', ''); // Removes the dot from the month abbreviation
        };


        var weekth = <?= $weekth ?>;
        var step = <?= $step ?>;


        $(document).ready(function() {
            const gotoHome = () => {
                window.parent.location.href= "http://localhost:3000";
                // window.parent.location.href= env('Parent_URL', 'default_value');
            }
            $(".am").on('click', function(e) {
                // e.target["id"]
                $(".am").removeClass("border-b-2 border-[#fbee21]");
                $(e.target).addClass("border-b-2 border-[#fbee21]")
                $("#selectedTime").html($(e.target).html())
            })

            $(".pm").on('click', function(e) {
                // e.target["id"]
                $(".pm").removeClass("border-b-2 border-[#fbee21]");
                $(e.target).addClass("border-b-2 border-[#fbee21]")
                $("#selectedTime").html($(e.target).html())
            })

            $(".time-select-block").on('click', function(e) {

                $(".time-select-block").removeClass("bg-[#c60384] text-white");
                $(e.target).addClass("bg-[#c60384] text-white")
                $("#selectedTime").html($(e.target).html())
            })
            $("#next-btn").on('click', function(e) {
                if (weekth < 3) {
                    weekth++;

                    $($(".select-day-block")[0]).html(
                        [1, 2, 3, 4, 5, 6, 7].map((aa) => {
                            return "<div id='selected-day-" + aa + "' class='selected-day-block cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36'><div class='font-bold'>" + getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + aa)) + "</div><div>" + getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + aa - 1)) + "</div></div>";
                        })
                    )
                }
            })
            $("#prev-btn").on('click', function(e) {
                if (weekth > 0) {
                    weekth--;
                    // e.target["id"]
                    $($(".select-day-block")[0]).html(
                        [1, 2, 3, 4, 5, 6, 7].map((aa) => {
                            return "<div id='selected-day-" + aa + "' class='selected-day-block cursor-pointer flex flex-col justify-center items-center text-[24px] w-36 min-w-36'><div class='font-bold'>" + getWeekdayInSpanish(getFutureDateInEnglish(weekth * 7 + aa)) + "</div><div>" + getDayAndMonthInSpanish(getFutureDateInEnglish(weekth * 7 + aa - 1)) + "</div></div>";
                        })
                    )
                }
            })
            $(".select-day-block ").on('click', '.selected-day-block', function(e) {
                $('.selected-day-block').removeClass("border-b-2 border-[#fbee21]");
                $(e.target).parent(".selected-day-block").addClass("border-b-2 border-[#fbee21]");
                var selectedNum = e.target.parentElement["id"].split("-")[2];
                $("#selectedDate").text(getFutureDateInSpanish(parseInt(weekth) * 7 + parseInt(selectedNum) - 1));
            })

            $(".seats").on('click', function(e) {
                var seatState = e.target.classList[0].split("-")[1];
                var seatDirection = e.target.classList[1];
                var seatid = e.target.parentElement["id"].split("-")[1];
                console.log('====================================');
                console.log(seatid);
                console.log('====================================');
                if (seatState == "Empty") {
                    if (seatDirection == "transform")
                        $(e.target).parent(".seats").html(
                            " <img width='50' height='50' src='{{asset('imgs/icons/38.png')}}' alt='logo' class='seat-Full transform scale-x-[-1] cursor-pointer'>"
                        )
                    else
                        $(e.target).parent(".seats").html(
                            " <img width='50' height='50' src='{{asset('imgs/icons/38.png')}}' alt='logo' class='seat-Full cursor-pointer'>"
                        )
                    
                    





                } else if (seatState == "Full") {
                    if (seatDirection == "transform")
                        $(e.target).parent(".seats").html(
                            " <img width='50' height='50' src='{{asset('imgs/icons/40.png')}}' alt='logo' class='seat-Empty transform scale-x-[-1] cursor-pointer'>"
                        )
                    else
                        $(e.target).parent(".seats").html(
                            " <img width='50' height='50' src='{{asset('imgs/icons/40.png')}}' alt='logo' class='seat-Empty cursor-pointer'>"
                        )
                }





            })

            $("#step-12").on('click', function(e) {
                $('.step-1').removeClass("flex");
                $('.step-1').addClass("hidden");
                $('.step-2').removeClass("hidden");
                $('.step-2').addClass("flex");
                if ($("#selectedTime").text().includes('AM') == true) {
                    $('#pm-block').removeClass("flex");
                    $('#pm-block').addClass("hidden");
                    $('#am-block').removeClass("hidden");
                    $('#am-block').addClass("flex");
                } else {
                    $('#am-block').removeClass("flex");
                    $('#am-block').addClass("hidden");
                    $('#pm-block').removeClass("hidden");
                    $('#pm-block').addClass("flex");
                }
            })
            $("#step-23").on('click', function(e) {
                $('.step-2').removeClass("flex");
                $('.step-2').addClass("hidden");
                $('.step-3').removeClass("hidden");
                $('.step-3').addClass("flex");
                $('step-u3').removeClass("flex");
                $('step-u3').addClass("hidden");

            })
            $("#step-21").on('click', function(e) {
                $('.step-2').removeClass("flex");
                $('.step-2').addClass("hidden");
                $('.step-1').removeClass("hidden");
                $('.step-1').addClass("flex");
            })
            $("#step-32").on('click', function(e) {
                $('.step-3').removeClass("flex");
                $('.step-3').addClass("hidden");
                $('.step-2').removeClass("hidden");
                $('.step-2').addClass("flex");
            })
        })


        // var step = <?php echo $step; ?>;
        // const getData = () => {
        //     fetch("{{route('api.data')}}", {
        //         method:"POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'X-CSRF-TOKEN': '{{ csrf_token() }}', // Include CSRF token for security
        //             'Accept':'application/json'
        //         },
        //         body: JSON.stringify({step:step})
        //     }).then(res => res.json()).then(data => {
        //         console.log(data)

        //     })
        //     // let aa = res.json();
        //     // console.log(res)
        // }
        // $.ajax({
        //     url : "",
        //     method:"POST",//GET
        //     dataType:"HTML",//JSON Blob base64,
        //     success : function(data){
        //         $("#temp").html(data);
        //     }
        // })
        // $.ajax({
        //     url : "",
        //     method:"POST",//GET
        //     dataType:"JSON",//JSON Blob base64,
        //     success : function(data){
        //         $("#gender").val(data.gender);
        //         // var aa = $("#gender").val();
        //     }
        // })
    </script>
</body>

</html>