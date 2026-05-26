package com.worthgrow.my_dashboard.service;

import com.worthgrow.my_dashboard.entity.EconomicIndicator;
import com.worthgrow.my_dashboard.entity.IndicatorMeta;
import com.worthgrow.my_dashboard.repository.EcomomicIndicatorRepository;
import com.worthgrow.my_dashboard.repository.IndicatorMetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EcomomicIndicatorService {

    private final EcomomicIndicatorRepository ecomomicIndicatorRepository;
    private final IndicatorMetaRepository indicatorMetaRepository;

    public List<IndicatorMeta> getAllIndicatorMeta(){
        return indicatorMetaRepository.findAll();
    }
    public List<EconomicIndicator> getIndicatorsByCode(IndicatorMeta code) {

        return ecomomicIndicatorRepository.findByIndicatorCode(code);
    }
}
