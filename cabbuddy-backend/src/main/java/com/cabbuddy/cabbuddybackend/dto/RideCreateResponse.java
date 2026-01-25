package com.cabbuddy.cabbuddybackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.cabbuddy.cabbuddybackend.enums.RideStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideCreateResponse {

    private Long id;
    private String source;
    private String destination;
    private LocalDate rideDate;
    
    // Departure time (pickup time) - REPLACES rideTime
    private LocalTime departureTime;
    
    // Arrival time (drop-off time)
    private LocalTime arrivalTime;
    
    private int availableSeats;
    private double pricePerSeat;
    private RideStatus status;

    private Long driverId;
    private String driverName;
}
