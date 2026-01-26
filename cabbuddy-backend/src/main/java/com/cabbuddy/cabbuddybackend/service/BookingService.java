package com.cabbuddy.cabbuddybackend.service;

import java.util.List;

import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;

public interface BookingService {

    BookingResponseDTO createBooking(Long userId, BookingRequestDTO requestDTO);

    BookingResponseDTO getBookingById(Long bookingId);

    List<BookingResponseDTO> getBookingsByUserId(Long userId);

    List<BookingResponseDTO> getBookingsByRideId(Long rideId);

    void cancelBooking(Long bookingId);
}
