<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\SeatModel;

class ClassController extends Controller
{

    public function show($id)
    {
        // Fetch class details based on $id 
        $seats = config('seats.list');
        $specialSeatsFromData = SeatModel::all(["id", "dateNum", "seatNum", "State"]);

        for ($i = 0; $i < 240; $i++) {
            for ($j = 0; $j < 39; $j++)
                $seats[$i][$j] = 'Empty';
        }
        for ($i = 0; $i < count($specialSeatsFromData); $i++) {
            $seats[$specialSeatsFromData[$i]['dateNum']][$specialSeatsFromData[$i]['seatNum']] = $specialSeatsFromData[$i]['State'];
        }

        $classDetails = [
            'id' => $id,
            'name' => "Class $id",
            'description' => "Description for class $id",
        ];
        $homeUrl = env('Parent_URL', 'default_value');
        $today = Carbon::today();
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
            'classDetails',
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
    public function saveSeat(Request $req){
        $data = $req->all();
        $price = $data["totalprice"];
        SeatModel::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);
        return response()->json(array("as" => "sdfsd"));
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
