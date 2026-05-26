package com.worthgrow.my_dashboard.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class FredResponseDto {

    private List<Observation> observations;


    @Getter @Setter
    public static class Observation{
        private String date;
        private String value; //실제 지표 값
    }
}
