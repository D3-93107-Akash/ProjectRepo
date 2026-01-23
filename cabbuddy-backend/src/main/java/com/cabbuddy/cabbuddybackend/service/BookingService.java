package com.cabbuddy.cabbuddybackend.service;

import java.util.List;

import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;

/**
 * BookingService
 * --------------
 * Defines business operations related to booking.
 * Interface ensures loose coupling and testability.
 */
public interface BookingService {

    /**
     * Books a ride for a given user.
     */
    BookingResponseDTO bookRide(BookingRequestDTO requestDTO);
    
    
    /**
     * Fetch booking details using booking ID.
     */
    BookingResponseDTO getBookingById(Long bookingId);

    
    
    /**
     * Fetch all bookings for a given user.
     */
    List<BookingResponseDTO> getBookingsByUserId(Long userId);

    
    
    /**
     * Fetch all bookings for a given ride.
     */
    List<BookingResponseDTO> getBookingsByRideId(Long rideId);

    
    /**
     * Cancels a booking by its ID.
     */
    BookingResponseDTO cancelBooking(Long bookingId);

    
    
    
    
}
