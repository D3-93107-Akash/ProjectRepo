package com.cabbuddy.cabbuddybackend.service;


import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;
import com.cabbuddy.cabbuddybackend.entity.Booking;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.BookingStatus;
import com.cabbuddy.cabbuddybackend.exception.BusinessException;
import com.cabbuddy.cabbuddybackend.exception.ResourceNotFoundException;
import com.cabbuddy.cabbuddybackend.repository.BookingRepository;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import com.cabbuddy.cabbuddybackend.service.BookingService;

/**
 * BookingServiceImpl
 * ------------------
 * Contains complete business logic for booking a ride.
 */
@Service
@Transactional // Ensures atomic operation (rollback on failure)
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RideRepository rideRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            RideRepository rideRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
    }

    /**
     * Core business method to book a ride.
     */
    @Override
    public BookingResponseDTO bookRide(BookingRequestDTO requestDTO) {

        //  Fetch User from database
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: " + requestDTO.getUserId()));

        //  Fetch Ride from database
        Ride ride = rideRepository.findById(requestDTO.getRideId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ride not found with ID: " + requestDTO.getRideId()));

        // Check if user has already booked this ride
//        In CabBuddy, one user should not be able to:
//        	Book the same ride multiple times
//        	Accidentally reserve extra seats by repeated bookings
//        	Create duplicate booking records
//        	This check prevents duplicate bookings at the service layer
        bookingRepository.findByUserAndRide(user, ride)
                .ifPresent(existingBooking -> {
                    throw new BusinessException("User has already booked this ride");
                });

        // Create Booking entity and populate fields
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRide(ride);
        booking.setSeatsBooked(requestDTO.getSeatsBooked());

        // Status must follow senior-defined enum
        booking.setStatus(BookingStatus.CONFIRMED);

        // Persist booking to database
        Booking savedBooking = bookingRepository.save(booking);

        // Convert entity to response DTO (manual mapping)
        return mapToResponseDTO(savedBooking);
    }
    
    
    @Override
    public BookingResponseDTO getBookingById(Long bookingId) {

        // STEP 1: Fetch booking using primary key
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with ID: " + bookingId));

        // STEP 2: Convert entity to response DTO
        // Entity should never be returned directly to client
        return mapToResponseDTO(booking);
    }
    
    
    @Override
    public List<BookingResponseDTO> getBookingsByUserId(Long userId) {

        // STEP 1: Validate user existence
        // Bookings cannot be fetched for a non-existing user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: " + userId));

        // STEP 2: Fetch all bookings made by this user
        List<Booking> bookings = bookingRepository.findAllByUser(user);

        // STEP 3: Convert each Booking entity to BookingResponseDTO
        // Manual mapping ensures controlled API response
     // stream()  → processes bookings one by one
     // map()     → converts each Booking to BookingResponseDTO
     // this::mapToResponseDTO → method reference used for conversion
     // toList()  → collects all converted DTOs into a List
        // BELOW CODE IS SAME AS THIS FOR 
		//        List<BookingResponseDTO> responseList = new ArrayList<>();
		//
		//        for (Booking booking : bookings) {
		//            responseList.add(mapToResponseDTO(booking));
		//        }
		//
		//        return responseList;

        return bookings.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    
    @Override
    public List<BookingResponseDTO> getBookingsByRideId(Long rideId) {

        // STEP 1: Validate ride existence
        // Bookings cannot be fetched for a non-existing ride
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ride not found with ID: " + rideId));

        // STEP 2: Fetch all bookings associated with this ride
        List<Booking> bookings = bookingRepository.findAllByRide(ride);

        // STEP 3: Convert Booking entities to BookingResponseDTO list
        // Manual mapping ensures clean and controlled API response
        return bookings.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    @Override
    public BookingResponseDTO cancelBooking(Long bookingId) {

        // STEP 1: Fetch booking by ID
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with ID: " + bookingId));

        // STEP 2: Business rule validation
        // A booking that is already CANCELLED should not be cancelled again
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BusinessException("Booking is already cancelled");
        }

        // STEP 3: Update booking status
        // Status transition strictly follows senior-defined enum
        booking.setStatus(BookingStatus.CANCELLED);

        // STEP 4: Persist updated booking
        // @Transactional ensures atomic update
        Booking updatedBooking = bookingRepository.save(booking);

        // STEP 5: Convert updated entity to response DTO
        return mapToResponseDTO(updatedBooking);
    }
    
    
   
    /**
     * Converts Booking entity to BookingResponseDTO.
     * Manual mapping gives full control and clarity.
     */
    private BookingResponseDTO mapToResponseDTO(Booking booking) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setRideId(booking.getRide().getId());
        dto.setSeatsBooked(booking.getSeatsBooked());
        dto.setStatus(booking.getStatus().name());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
}
