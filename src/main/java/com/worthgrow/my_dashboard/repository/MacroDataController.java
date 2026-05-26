package com.worthgrow.my_dashboard.repository;

import com.worthgrow.my_dashboard.entity.FredResponseDto;
import com.worthgrow.my_dashboard.service.FredApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class MacroDataController {

    private final FredApiService service;

    @GetMapping("/indicator-chart/{code}")
    public List<Map<String, Object>> getChartData(@PathVariable String code){
        //최근 12개월 치
        FredResponseDto dto = service.fetchMacroData(code, 12);

        List<Map<String, Object>> chartDataList = new ArrayList<>();

        if(dto != null && dto.getObservations() != null){
            for(FredResponseDto.Observation obs : dto.getObservations()){
                try{
                    if(!".".equals(obs.getValue())){
                        double val = Double.parseDouble(obs.getValue());
                        String month = obs.getDate().substring(5, 7) + "M";

                        chartDataList.add(Map.of(
                                "data", month,
                                "value", val
                        ));
                    }
                } catch (Exception e) {
                    //throw new RuntimeException(e);
                }
            }
        }

        Collections.reverse(chartDataList);
        return chartDataList;
    }
}
