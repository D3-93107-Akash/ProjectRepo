package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabbuddy.cabbuddybackend.dto.request.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;



public interface RideService {


	public Ride createRide(RideCreateRequest request);
	public List<Ride> searchRide(String source, String destination, LocalDate date);
	public void cancelRide(Long rideId);
	
	

}
