package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.cabbuddy.cabbuddybackend.dto.request.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;


@Service
@Transactional
public class RideServiceImplementation implements RideService {

	@Autowired
	private RideRepository rideRepository;
	
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public List<Ride> searchRide(String source, String destination, LocalDate date) {
		return rideRepository.findBySourceAndDestinationAndRideDate(source, destination, date);
	}


	@Override
	public void cancelRide(Long rideId) {
		Ride existingRide = rideRepository.findById(rideId)
				.orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
		
		if(existingRide.getStatus().equals(RideStatus.ACTIVE)) {
			existingRide.setStatus(RideStatus.CANCELLED);
		}
				
	}


	@Override
	@Transactional
	public Ride createRide(RideCreateRequest request) {

	    // 1️⃣ Validate request
	    if (request.getAvailableSeats() <= 0) {
	        throw new ResponseStatusException(
	                HttpStatus.BAD_REQUEST,
	                "Available seats must be greater than 0"
	        );
	    }

	    // 2️⃣ Fetch driver (TEMP – without security)
	    User driver = userRepository.findById(request.getDriverId())
	            .orElseThrow(() ->
	                    new ResponseStatusException(
	                            HttpStatus.NOT_FOUND,
	                            "Driver not found"
	                    )
	            );

	    // 3️⃣ Create Ride entity
	    Ride ride = new Ride();
	    ride.setSource(request.getSource());
	    ride.setDestination(request.getDestination());
	    ride.setRideDate(request.getRideDate());
	    ride.setRideTime(request.getRideTime());
	    ride.setAvailableSeats(request.getAvailableSeats());
	    ride.setPricePerSeat(request.getPricePerSeat());

	    // 4️⃣ System-controlled fields
	    ride.setStatus(RideStatus.ACTIVE);
	    ride.setDriver(driver);

	    // 5️⃣ Save and return
	    return rideRepository.save(ride);
	}




}
