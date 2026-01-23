package com.cabbuddy.cabbuddybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;

import java.util.List;
import java.time.LocalDate;


@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

	public List<Ride> findBySourceAndDestinationAndRideDate(String source, String destination, LocalDate rideDate);
	public List<Ride> findByDriver(User driver);
	public List<Ride> findByStatus(RideStatus status);
}
