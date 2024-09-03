<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class ClassController extends Controller
{

    public function show($id)
    {
        // Fetch class details based on $id 

        $classDetails = [
            'id' => $id,
            'name' => "Class $id",
            'description' => "Description for class $id",
        ];
        $homeUrl = env('Parent_URL', 'default_value');
        $today = Carbon::today();
        $selectedDate = $this->getFutureDateInSpanish(5);
        $selectedTime = '7:00 - 8:00 AM';
        $weekth = 0;
        $selectedNum = 0;
        $seats = config('seats.list');
        $firstseats = $seats[0];
        $totalprice = 0;
        $fullSeatsCount = 0;
        $disableSeatsCount = 0;
        $emptySeatsCount = 0;
        $hrid = -1;
        foreach($firstseats as $index => $item){
            if($item == "Full") {$fullSeatsCount ++; $totalprice += 50;}
            if($item == "Disable") $disableSeatsCount ++;
            if($item == "Empty") $emptySeatsCount ++;
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
            'getFutureDateInSpanish' => function($days) { return $this->getFutureDateInSpanish($days); },
            'getFutureDateInEnglish' => function($days) { return $this->getFutureDateInEnglish($days); },
            'getWeekdayInSpanish' => function($date) { return $this->getWeekdayInSpanish($date); },
            'getDayAndMonthInSpanish' => function($date) { return $this->getDayAndMonthInSpanish($date); },
            'getClaseList' => function($clase) { return $this->getClaseList($clase); },
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
