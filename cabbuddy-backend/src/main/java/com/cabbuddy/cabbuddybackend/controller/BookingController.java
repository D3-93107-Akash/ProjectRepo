//package com.cabbuddy.cabbuddybackend.controller;
//
//public class BookingController {
//	
//	
//	
//	
//
//}
package com.cabbuddy.cabbuddybackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;
import com.cabbuddy.cabbuddybackend.service.BookingService;

import jakarta.validation.Valid;

/**
 * BookingController
 * -----------------
 * Exposes REST APIs related to booking.
 */
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * POST /api/bookings
     * Used to book a ride.
     */
    @PostMapping
    public ResponseEntity<BookingResponseDTO> bookRide(
            @Valid @RequestBody BookingRequestDTO requestDTO) {

        BookingResponseDTO response = bookingService.bookRide(requestDTO);

        // 201 CREATED → booking successfully created
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    

    
    
    /**
     * GET /api/bookings/{id}
     * ----------------------
     * Fetch booking details by booking ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Long id) {

        BookingResponseDTO response = bookingService.getBookingById(id);

        // 200 OK → booking found and returned
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByUserId(
            @PathVariable Long userId) {

        List<BookingResponseDTO> response =
                bookingService.getBookingsByUserId(userId);

        // 200 OK → list may be empty or populated
        return ResponseEntity.ok(response);
    }
    
    
    
    @GetMapping("/ride/{rideId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByRideId(
            @PathVariable Long rideId) {

        List<BookingResponseDTO> response =
                bookingService.getBookingsByRideId(rideId);

        // 200 OK → list may be empty or populated
        return ResponseEntity.ok(response);
    }
    
    
    /**
     * PUT /api/bookings/{id}/cancel
     * ------------------------------
     * Cancels an existing booking by booking ID.
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(@PathVariable Long id) {

        BookingResponseDTO response = bookingService.cancelBooking(id);

        // 200 OK → booking successfully cancelled
        return ResponseEntity.ok(response);
    }

    
    
    
    
}
