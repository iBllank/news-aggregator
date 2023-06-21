<?php

namespace App\Models;

use App\Helpers\Constants;
use Illuminate\Database\Eloquent\Model;
use App\Helpers\Helper;
use Illuminate\Support\Arr;

class NewYorkTimesApi extends Model
{
    private $providerName = Constants::NYT_PROVIDER_NAME;
    public function fetchNews()
    {
        // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
        $urlParams = 'articlesearch.json?';
        $response = (new Helper)->makeApiCalls($urlParams, $this->providerName);
        return Arr::get($response,'response.docs');
    }

}
