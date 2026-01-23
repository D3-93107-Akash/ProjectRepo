package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;

import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;



public interface RideService {

	  RideCreateResponse createRide(RideCreateRequest request);

	    List<RideCreateResponse> searchRides(
	            String source,
	            String destination,
	            LocalDate rideDate
	    );

	    RideCreateResponse cancelRide(Long rideId);
	    
	    RideCreateResponse getRideById(Long rideId);
	    
	    List<RideCreateResponse> getRidesByDriverId(Long driverId);
	    
	    List<RideCreateResponse> getRidesByStatus(RideStatus status);

	    
	 

	
	

}
