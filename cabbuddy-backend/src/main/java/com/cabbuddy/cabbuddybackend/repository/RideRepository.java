package com.cabbuddy.cabbuddybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;

import java.util.List;
import java.time.LocalDate;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findBySourceAndDestinationAndRideDate(String source, String destination, LocalDate rideDate);
    List<Ride> findByDriver(User driver);
    List<Ride> findByStatus(RideStatus status);
    
    // ✅ ADD THIS NEW QUERY
    @Query("SELECT r FROM Ride r WHERE r.driver.id = :driverId ORDER BY r.rideDate DESC")
    List<Ride> findByDriverIdOrderByRideDateDesc(@Param("driverId") String driverId);
}
