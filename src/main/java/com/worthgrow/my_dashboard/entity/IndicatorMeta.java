package com.worthgrow.my_dashboard.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="indicator_meta")
public class IndicatorMeta {

    @Id
    @Column(name="indicator_code", length = 50)
    private String indicatorCode;

    @Column(name="indicator_name", length = 100, nullable = false)
    private String indicatorName;

    @Column(name="category", length = 50)
    private String category;

    @Column(name="preferred_view", length = 20)
    private String preferredView; //chart, text

    @Column(name="current_value", length=50)
    private String currentValue;
}
