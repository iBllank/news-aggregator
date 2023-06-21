<?php

namespace App\Models;

use App\Helpers\Helper;
use App\Helpers\Constants;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Model;

class NewsApi extends Model
{
    private $providerName = Constants::NEWS_API_PROVIDER_NAME;

    public function fetchNewsFromSource($newsSource)
    {
        // https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY
        $urlParams = 'top-headlines?sources=' . $newsSource;
        $response = (new Helper)->makeApiCalls($urlParams, $this->providerName);
        return Arr::get($response,'articles');
    }

    public function getAllSources()
    {
        $urlParams = 'sources?';
        $response = (new Helper)->makeApiCalls($urlParams, $this->providerName);
        return Arr::get($response,'sources');
    }

}
