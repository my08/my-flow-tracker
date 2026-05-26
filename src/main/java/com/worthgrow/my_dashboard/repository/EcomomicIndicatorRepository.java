package com.worthgrow.my_dashboard.repository;

import com.worthgrow.my_dashboard.entity.EconomicIndicator;
import com.worthgrow.my_dashboard.entity.IndicatorMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EcomomicIndicatorRepository extends JpaRepository<EconomicIndicator, Long> {

    List<EconomicIndicator> findByIndicatorCode(IndicatorMeta indicatorCode);

}
