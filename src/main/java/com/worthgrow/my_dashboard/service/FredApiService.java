package com.worthgrow.my_dashboard.service;

import com.worthgrow.my_dashboard.entity.FredResponseDto;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class FredApiService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${fred.api.key}")
    private String apikey;

    @Value("${fred.api.base-url}")
    private String baseUrl;


    public FredResponseDto fetchMacroData(String seriesId, int limit){
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl+"/series/observations")
                .queryParam("series_id", seriesId)
                .queryParam("api_key", apikey)
                .queryParam("file_type", "json")
                .queryParam("sort_order", "desc")
                .queryParam("limit", limit)
                .toUriString();

        try{
            return restTemplate.getForObject(url, FredResponseDto.class);
        }catch (Exception e){
            log.debug(seriesId + " FRED API 호출 실패 : " + e.getMessage());
            return null;
        }
    }

}
