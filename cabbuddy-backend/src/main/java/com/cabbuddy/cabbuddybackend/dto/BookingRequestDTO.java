package com.cabbuddy.cabbuddybackend.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * BookingRequestDTO
 * -----------------
 * Acts as input contract for booking a ride.
 * Prevents exposing internal entity structure to clients.
 */
@Getter
@Setter
public class BookingRequestDTO {

    // ID of the user who is booking the ride
    @NotNull(message = "User ID is required")
    private Long userId;

    // ID of the ride being booked
    @NotNull(message = "Ride ID is required")
    private Long rideId;

    // Number of seats user wants to book
    @Min(value = 1, message = "Seats booked must be at least 1")
    private int seatsBooked;
}
