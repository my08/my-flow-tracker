package com.worthgrow.my_dashboard.controller;


import com.worthgrow.my_dashboard.entity.EconomicIndicator;
import com.worthgrow.my_dashboard.entity.IndicatorMeta;
import com.worthgrow.my_dashboard.service.EcomomicIndicatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RestController
public class EcomomicIndicatorController {

    private final EcomomicIndicatorService indicatorService;

    @GetMapping(value = "/api/v1/indicator-meta", produces = "application/json;charset=UTF-8")
    @CrossOrigin(origins="http://localhost:3000")
    public List<IndicatorMeta> getIndicatorMetaList(){
        return indicatorService.getAllIndicatorMeta();
    }
    @GetMapping("api/v1/ecomomic-indicator/{code}")
    public List<EconomicIndicator> getIndicators(@PathVariable("code") IndicatorMeta code){
        return indicatorService.getIndicatorsByCode(code);
    }
}
