package com.worthgrow.my_dashboard.repository;

import com.worthgrow.my_dashboard.entity.IndicatorMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorMetaRepository extends JpaRepository<IndicatorMeta, String> {


}
