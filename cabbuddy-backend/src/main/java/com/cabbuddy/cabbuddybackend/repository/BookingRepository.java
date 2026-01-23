//package com.cabbuddy.cabbuddybackend.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.cabbuddy.cabbuddybackend.entity.Booking;
//
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//
//}

package com.cabbuddy.cabbuddybackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cabbuddy.cabbuddybackend.entity.Booking;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;

/**
 * BookingRepository
 * -----------------
 * Handles all database operations related to Booking entity.
 */
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Used to check if a user has already booked a specific ride.
     * Prevents duplicate bookings.
     */
    Optional<Booking> findByUserAndRide(User user, Ride ride);
    
    
    
    /**
     * Fetch all bookings made by a user.
     */
    List<Booking> findAllByUser(User user);
    
    
    
    
    /**
     * Fetch all bookings for a specific ride.
     */
    List<Booking> findAllByRide(Ride ride);


}
