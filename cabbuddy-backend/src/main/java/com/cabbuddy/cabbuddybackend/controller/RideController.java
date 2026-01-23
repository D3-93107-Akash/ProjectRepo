package com.cabbuddy.cabbuddybackend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.service.RideService;


@RestController
@RequestMapping("/api/rides")
public class RideController {
	
	@Autowired
	private RideService rideService;
	
	@GetMapping("/rides")
	ResponseEntity<List<Ride>> getAllRides(@RequestParam String source,
			@RequestParam String Destination,@RequestParam LocalDate rideDate){
		return ResponseEntity.status(HttpStatus.OK).body(rideService.searchRide(source, Destination, rideDate));
	}
	

	 @PostMapping("/add-ride")
	    public ResponseEntity<Ride> addRide(
	            @org.springframework.web.bind.annotation.RequestBody RideCreateRequest request
	    ) {
	        Ride savedRide = rideService.createRide(request);
	        return ResponseEntity.status(HttpStatus.CREATED).body(savedRide);
	    }

}
