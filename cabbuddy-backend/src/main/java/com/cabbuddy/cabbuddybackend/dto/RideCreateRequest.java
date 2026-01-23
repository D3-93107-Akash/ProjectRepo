package com.cabbuddy.cabbuddybackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideCreateRequest {


    private String source;
    private String destination;
    private LocalDate rideDate;
    private LocalTime rideTime;
    private int availableSeats;
    private double pricePerSeat;
    private Long driverId; // TEMP: later remove when JWT added
}
