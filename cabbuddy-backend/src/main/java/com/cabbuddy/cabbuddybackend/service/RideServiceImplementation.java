package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;

import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;
import com.cabbuddy.cabbuddybackend.enums.UserRole;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;


@Service
@Transactional
public class RideServiceImplementation implements RideService {

    private final SecurityFilterChain securityFilterChain;

	@Autowired
	private RideRepository rideRepository;
	
	@Autowired
	private UserRepository userRepository;

    RideServiceImplementation(SecurityFilterChain securityFilterChain) {
        this.securityFilterChain = securityFilterChain;
    }

	@Override
	public RideCreateResponse createRide(RideCreateRequest request) {

        if (request.getRideDate().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ride date cannot be in the past"
            );
        }

        User driver = userRepository.findById(request.getDriverId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Driver not found"
                        )
                );

        
        if (driver.getRole() != UserRole.DRIVER) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only drivers can create rides"
            );
        }

        Ride ride = new Ride();
        ride.setSource(request.getSource());
        ride.setDestination(request.getDestination());
        ride.setRideDate(request.getRideDate());
        ride.setRideTime(request.getRideTime());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setPricePerSeat(request.getPricePerSeat());
        ride.setStatus(RideStatus.ACTIVE);
        ride.setDriver(driver);

        Ride savedRide = rideRepository.save(ride);
        return mapToResponse(savedRide);
	}

	@Override
	public List<RideCreateResponse> searchRides(String source, String destination, LocalDate rideDate) {
		return rideRepository
                .findBySourceAndDestinationAndRideDate(
                        source, destination, rideDate)
                .stream()
                .map(this::mapToResponse)
                .toList();
	}

	@Override
	public RideCreateResponse cancelRide(Long rideId) {

	    Ride ride = rideRepository.findById(rideId)
	            .orElseThrow(() ->
	                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Ride not found"));

	    // Cancel ride
	    ride.setStatus(RideStatus.CANCELLED);
	    rideRepository.save(ride);

	    // Driver (already linked in Ride)
	    User driver = ride.getDriver();

	    // Build full response
	    RideCreateResponse response = new RideCreateResponse();
	    response.setId(ride.getId());
	    response.setSource(ride.getSource());
	    response.setDestination(ride.getDestination());
	    response.setRideDate(ride.getRideDate());
	    response.setRideTime(ride.getRideTime());
	    response.setAvailableSeats(ride.getAvailableSeats());
	    response.setPricePerSeat(ride.getPricePerSeat());
	    response.setStatus(ride.getStatus());

	    if (driver != null) {
	        response.setDriverId(driver.getId());
	        response.setDriverName(driver.getName()); // or getFullName()
	    }

	    return response;
	}




	


	
	 private RideCreateResponse mapToResponse(Ride ride) {
	        RideCreateResponse response = new RideCreateResponse();
	        response.setId(ride.getId());
	        response.setSource(ride.getSource());
	        response.setDestination(ride.getDestination());
	        response.setRideDate(ride.getRideDate());
	        response.setRideTime(ride.getRideTime());
	        response.setAvailableSeats(ride.getAvailableSeats());
	        response.setPricePerSeat(ride.getPricePerSeat());
	        response.setStatus(ride.getStatus());
	        response.setDriverId(ride.getDriver().getId());
	        response.setDriverName(ride.getDriver().getName());
	        return response;
	    }

	 @Override
	 public RideCreateResponse getRideById(Long rideId) {

	     Ride ride = rideRepository.findById(rideId)
	             .orElseThrow(() ->
	                 new ResponseStatusException(HttpStatus.NOT_FOUND, "Ride not found"));

	     RideCreateResponse response = new RideCreateResponse();
	     response.setId(ride.getId());
	     response.setSource(ride.getSource());
	     response.setDestination(ride.getDestination());
	     response.setRideDate(ride.getRideDate());
	     response.setRideTime(ride.getRideTime());
	     response.setAvailableSeats(ride.getAvailableSeats());
	     response.setPricePerSeat(ride.getPricePerSeat());
	     response.setStatus(ride.getStatus());

	     if (ride.getDriver() != null) {
	         response.setDriverId(ride.getDriver().getId());
	         response.setDriverName(ride.getDriver().getName());
	     }

	     return response;
	 }
	 
	 
	 @Override
	 public List<RideCreateResponse> getRidesByDriverId(Long driverId) {

	     User driver = userRepository.findById(driverId)
	             .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Driver not found"));

	     return rideRepository.findByDriver(driver)
	             .stream()
	             .map(this::mapToResponse)
	             .toList();
	 }
	 
	 
	 @Override
	 public List<RideCreateResponse> getRidesByStatus(RideStatus status) {
	     List<Ride> rides;

	     if (status == null) {
	         // If no status provided, return all rides
	         rides = rideRepository.findAll();
	     } else {
	         rides = rideRepository.findByStatus(status);
	     }

	     return rides.stream()
	                 .map(this::mapToResponse)
	                 .toList();
	 }


	 
	 
	 
}
	




