<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\SeatModel;
use App\Models\BookedModel;

class ClassController extends Controller
{

    public function show()
    {
        $today = Carbon::today();
        // Fetch class details based on $id 
        $seats = config('seats.list');
        $specialSeatsFromData = SeatModel::all(['id', 'date', 'classNum', 'seatNum', 'State']);
        for ($i = 0; $i < 240; $i++) {
            for ($j = 0; $j < 39; $j++)
                $seats[$i][$j] = 'Empty';
        }
        for ($i = 0; $i < count($specialSeatsFromData); $i++) {
            if ($specialSeatsFromData[$i]['date'] > ($today->addDays(-1))) {
                $today = Carbon::today();
                $dateNum = intval($today->diffInDays($specialSeatsFromData[$i]['date'])) * 8 + intval($specialSeatsFromData[$i]['classNum']);
                $seats[$dateNum][$specialSeatsFromData[$i]['seatNum']] = $specialSeatsFromData[$i]['State'];
            }
        }

        $parentUrl = config('app.parent_url');

        $homeUrl = env('Parent_URL', 'default');

        $selectedDate = 0;
        $selectedTime = '7:00 - 8:00 AM';
        $weekth = 0;
        $selectedNum = 0;
        $firstseats = $seats[0];
        $totalprice = 0;
        $fullSeatsCount = 0;
        $disableSeatsCount = 0;
        $emptySeatsCount = 0;
        $hrid = -1;
        foreach ($firstseats as $index => $item) {
            if ($item == "Full") {
                $fullSeatsCount++;
                $totalprice += 50;
            }
            if ($item == "Disable") $disableSeatsCount++;
            if ($item == "Empty") $emptySeatsCount++;
        }
        $seatsDirection = config('seatsDirection.list');
        $step = 1;
        $weekth = 0;
        $profile = true;
        $profile2 = true;
        return view('class-details', compact(
            'today',
            'selectedDate',
            'selectedTime',
            'weekth',
            'selectedNum',
            'step',
            'seats',
            'firstseats',
            'seatsDirection',
            'profile',
            'profile2',
            'homeUrl',
            'parentUrl',
            'fullSeatsCount',
            'disableSeatsCount',
            'emptySeatsCount',
            'totalprice',
            'hrid'

        ))->with([
            'getFutureDateInSpanish' => function ($days) {
                return $this->getFutureDateInSpanish($days);
            },
            'getFutureDateInEnglish' => function ($days) {
                return $this->getFutureDateInEnglish($days);
            },
            'getWeekdayInSpanish' => function ($date) {
                return $this->getWeekdayInSpanish($date);
            },
            'getDayAndMonthInSpanish' => function ($date) {
                return $this->getDayAndMonthInSpanish($date);
            },
            'getClaseList' => function ($clase) {
                return $this->getClaseList($clase);
            },
        ]);
        // return view('class-details', compact(
        //         'step', 'seats', 'seatsDirection'
        //     ));
    }
    public function counter(Request $request)
    {

        $kk["asd"] = "asdf";
        $step = floatval($request["step"]) + 1;
        $a = json_encode($kk);
        return view();
        // return response()->json(array("step" => $step));

    }
    public function saveSeat(Request $req)
    {

        $today = Carbon::today();
        $data = $req->all();
        $selectedTimeSeats = $data["selectedTimeSeats"];
        $selectedSeatsNum = $data["selectedSeatsNum"];
        $nameVal = $data["nameVal"];
        $lastnameVal = $data["lastnameVal"];
        $phoneVal = $data["phoneVal"];
        $emailVal = $data["emailVal"];

        $specialSeatsFromData = SeatModel::all(['id', 'date', 'classNum', 'seatNum', 'State']);
        for ($i = 0; $i < 240; $i++) {
            for ($j = 0; $j < 39; $j++)
                $seats[$i][$j] = 'Empty';
        }
        for ($i = 0; $i < count($specialSeatsFromData); $i++) {
            if ($specialSeatsFromData[$i]['date']  >= $today) {
                $dateNum = intval($today->diffInDays($specialSeatsFromData[$i]['date'])) * 8 + intval($specialSeatsFromData[$i]['classNum']);
                $seats[$dateNum][$specialSeatsFromData[$i]['seatNum']] = $specialSeatsFromData[$i]['State'];
            }
        }
        for ($i = 0; $i < 39; $i++) {
            $today = Carbon::today();
            if ($selectedTimeSeats[$i] == "Full") {
                if ($seats[$selectedSeatsNum][$i] == "Disable" || $seats[$selectedSeatsNum][$i] == "Booked") {
                    // throw new \Exception("Seat $i for date that time is not available. Someone already booked or there is some issue for the seat.");
                    return response()->json(array("failed" => "Seat $i for date that time is not available. Someone already booked or there is some issue for the seat."));
                } else {
                    $today = Carbon::today();
                    $result = SeatModel::insert([
                        'date' => $today->addDays(intval($selectedSeatsNum) / 8),
                        'classNum' => intval($selectedSeatsNum) % 8,
                        'seatNum' => $i,
                        'State' => "Booked"
                    ]);
                    $today = Carbon::today();
                    $result1 = BookedModel::insert([
                        'name' => $nameVal,
                        'lastname' => $lastnameVal,
                        'phone' => $phoneVal,
                        'email' => $emailVal,
                        'date' => $today->addDays(intval($selectedSeatsNum) / 8),
                        'class' => intval($selectedSeatsNum) % 8,
                        'seatNumber' => $i,
                    ]);
                }
            }
        }
        return response()->json(array("success" => "Thank you. Seats are all booked successfully"));
    }
    private function getFutureDateInSpanish($days)
    {
        return Carbon::today()->addDays($days)->locale('es')->isoFormat('dddd D [de] MMMM');
    }

    private function getFutureDateInEnglish($days)
    {
        return Carbon::today()->addDays($days)->locale('en')->isoFormat('dddd, MMMM D');
    }

    private function getWeekdayInSpanish($date)
    {
        return Carbon::parse($date)->locale('es')->isoFormat('dddd');
    }

    private function getDayAndMonthInSpanish($date)
    {
        return Carbon::parse($date)->locale('es')->isoFormat('D MMM');
    }

    private function getClaseList($clase)
    {
        $classes = [
            'spinning' => 'Spinning',
            'yoga' => 'Yoga',
            'cycling' => 'Cycling',
            'combat' => 'Fit Combat',
            'zumba' => 'Zumba',
            'pliates' => 'Pliates',
        ];

        return $classes[$clase] ?? 'Spinning';
    }
}
