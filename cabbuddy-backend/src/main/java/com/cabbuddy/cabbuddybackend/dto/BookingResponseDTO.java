package com.cabbuddy.cabbuddybackend.dto;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * BookingResponseDTO
 * ------------------
 * Returned to client after successful booking.
 * Contains only safe, required information.
 */
@Getter
@Setter
public class BookingResponseDTO {

    private Long bookingId;
    private Long userId;
    private Long rideId;
    private int seatsBooked;
    private String status;
    private LocalDateTime createdAt;
}

