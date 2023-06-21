<?php

namespace App\Models;

use App\Helpers\Constants;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\Helper;
use Illuminate\Support\Arr;

class TheGuardianApi extends Model
{
    private $providerName = Constants::THE_GUARDIAN_PROVIDER_NAME;
    public function fetchNews()
    {
        // https://content.guardianapis.com/search?api-key=20c8162e-2027-4243-8f6b-5efa48855cac
        $urlParams = 'search?';
        $response = (new Helper)->makeApiCalls($urlParams, $this->providerName);
        return Arr::get($response,'response.results');
    }

}
