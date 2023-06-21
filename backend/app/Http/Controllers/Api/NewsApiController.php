<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsApi;
use App\Models\NewYorkTimesApi;
use App\Models\TheGuardianApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NewsApiController extends Controller
{


    public function displayAllNews(Request $request)
    {
        $response = $this->determineMethodHandler($request);
        $apiModel = new NewsApi();
        $response['news_api'] = $apiModel->fetchNewsFromSource($response['sourceId']);
        //$response['newsSources'] = $this->fetchAllNewsSources();

        $theGuardianModel = new TheGuardianApi();
        $response['the_guardian'] = $theGuardianModel->fetchNews();

        $NYTimesModel = new NewYorkTimesApi();
        $response['nyTimes'] = $NYTimesModel->fetchNews();

        return $response;
    }

    public function displayNewsApiProviderNews(Request $request)
    {
        $response = $this->determineMethodHandler($request);
        $apiModel = new NewsApi();
        $response['news_api'] = $apiModel->fetchNewsFromSource($response['sourceId']);
        $response['newsSources'] = $this->fetchAllNewsSources();
        return $response;
    }

    public function displayTheGuardianProviderNews()
    {
        $theGuardianModel = new TheGuardianApi();
        return $theGuardianModel->fetchNews();
    }

    public function displayNYTimesProviderNews()
    {
        $NYTimesModel = new NewYorkTimesApi();
        return $NYTimesModel->fetchNews();
    }

    protected function determineMethodHandler($request)
    {
        if ($request->isMethod('get')) {
            $response['sourceName'] = config('app.default_news_source');
            $response['sourceId'] = config('app.default_news_source_id');
        } else {
            $request->validate([
                'source' => 'required|string',
            ]);
            $split_input = explode(':', $request->source);
            $response['sourceId'] = trim($split_input[0]);
            $response['sourceName'] = trim($split_input[1]);
        }
        return $response;
    }

    public function fetchAllNewsSources()
    {
        $response = Cache::remember('allNewsSources', 22 * 60, function () {
            $api = new NewsApi;
            return $api->getAllSources();
        });
        return $response;
    }




}
