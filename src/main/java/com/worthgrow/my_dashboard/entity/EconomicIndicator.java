package com.worthgrow.my_dashboard.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="economic_indicators")
@Getter
@Setter
@NoArgsConstructor
public class EconomicIndicator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="indicator_code", nullable = false)
    private IndicatorMeta indicatorCode; //CPI, PPI, FEDFUNDS

    @Column(nullable = false)
    private LocalDate indicatorDate; //지표날짜

    @Column(nullable = false)
    private Double indicatorValue; //지표값
}
