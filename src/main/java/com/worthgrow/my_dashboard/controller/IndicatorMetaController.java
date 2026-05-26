package com.worthgrow.my_dashboard.controller;

import com.worthgrow.my_dashboard.entity.IndicatorMeta;
import com.worthgrow.my_dashboard.repository.IndicatorMetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class IndicatorMetaController {

    private final IndicatorMetaRepository repository;

    @GetMapping("/indicator-meta")
    public List<IndicatorMeta> getIndicatorMetaList(){
        return repository.findAll();
    }
}
