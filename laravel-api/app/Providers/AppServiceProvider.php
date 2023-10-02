<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('onlyfemale', function ($attribute, $value, $parameters, $validator) {
            $firstChar = strtoupper(substr($value, 0, 1));
            $lastDigit = intval(substr($value, -1));

            $letterToNumber = [
                'A' => 10, 'B' => 11, 'C' => 12, 'D' => 13, 'E' => 14,
                'F' => 15, 'G' => 16, 'H' => 17, 'I' => 34, 'J' => 18,
                'K' => 19, 'L' => 20, 'M' => 21, 'N' => 22, 'O' => 35,
                'P' => 23, 'Q' => 24, 'R' => 25, 'S' => 26, 'T' => 27,
                'U' => 28, 'V' => 29, 'W' => 32, 'X' => 30, 'Y' => 31, 'Z' => 33,
            ];

            if (!isset($letterToNumber[$firstChar])) {
                return false;
            }

            $firstDigit = floor($letterToNumber[$firstChar] / 10); // 十位数部分
            $secondDigit = $letterToNumber[$firstChar] % 10; // 个位数部分

            $digits = array_map('intval', str_split(substr($value, 1, 8)));

            $X = $firstDigit + $secondDigit * 9  + $digits[0] * 8 + $digits[1] * 7 + $digits[2] * 6 +
                $digits[3] * 5 + $digits[4] * 4 + $digits[5] * 3 +
                $digits[6] * 2 + $digits[7] * 1 + $lastDigit;

            return ($X % 10) === 0;
        });
    }
}
