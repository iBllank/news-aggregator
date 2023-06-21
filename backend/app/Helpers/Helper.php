<?php

namespace App\Helpers;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7;
class Helper
{
    /**
     * @param $url_params
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function makeApiCalls($url_params, $providerName)
    {
        $url = null;
        if($providerName == Constants::NEWS_API_PROVIDER_NAME) //news api
            $url = config('app.news_api_url') .$url_params.'&apiKey=' . config('app.news_api_key');
        elseif($providerName == Constants::THE_GUARDIAN_PROVIDER_NAME) //the guaridan
            $url = config('app.thegurdian_api_url') .$url_params.'&api-key=' . config('app.thegurdian_api_key');
        elseif($providerName == Constants::NYT_PROVIDER_NAME) //nyTimes
            $url = config('app.nyt_api_url') .$url_params.'&api-key=' . config('app.nyt_api_key');

        try {
            $client = new Client();
            $apiRequest = $client->request('GET', $url);
            return json_decode($apiRequest->getBody()->getContents(), true);
        } catch (RequestException $e) {
            //For handling exception
            echo Psr7\Message::toString($e->getRequest());
            if ($e->hasResponse()) {
                echo Psr7\Message::toString($e->getResponse());
            }
        }
    }

    public function selectDataFromNYTimes($nytimesArticlesArr){

            // {
            // "abstract": "The Florida governor, preparing for an all-but-declared campaign, is said to see an opening to take on the former president from the right.",
            // "web_url": "https://www.nytimes.com/2023/03/29/us/politics/ron-desantis-donald-trump-crime-2024.html",
            // "snippet": "The Florida governor, preparing for an all-but-declared campaign, is said to see an opening to take on the former president from the right.",
            // "lead_paragraph": "Gov. Ron DeSantis of Florida has spent months shoring up a tough-on-crime image as he weighs a run for the White House, calling for stronger penalties against drug traffickers and using $5,000 bonuses to bolster law-enforcement recruitment to his state.",
            // "source": "The New York Times",
            // "multimedia": [
            //     {
            //         "rank": 0,
            //         "subtype": "xlarge",
            //         "caption": null,
            //         "credit": null,
            //         "type": "image",
            //         "url": "images/2023/03/29/multimedia/27pol-desantis-crime-jkwg/27pol-desantis-crime-jkwg-articleLarge.jpg",
            //         "height": 400,
            //         "width": 600,
            //         "legacy": {
            //             "xlarge": "images/2023/03/29/multimedia/27pol-desantis-crime-jkwg/27pol-desantis-crime-jkwg-articleLarge.jpg",
            //             "xlargewidth": 600,
            //             "xlargeheight": 400
            //         },
            //         "subType": "xlarge",
            //         "crop_name": "articleLarge"
            //     },
            // }

            // data needed article: { author, urlToImage, title, description, publishedAt, Url }


    }
}

