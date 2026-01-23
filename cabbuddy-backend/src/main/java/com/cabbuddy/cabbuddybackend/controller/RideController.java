package com.cabbuddy.cabbuddybackend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cabbuddy.cabbuddybackend.service.RideService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    //  Search rides
    @GetMapping("/search")
    public ResponseEntity<List<RideCreateResponse>> searchRide(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        return ResponseEntity.ok(
                rideService.searchRides(source, destination, date)
        );
    }

    // Create ride
    @PostMapping
    public ResponseEntity<RideCreateResponse> createRide(
            @Valid @RequestBody RideCreateRequest newride) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(rideService.createRide(newride));
    }

    //  Cancel ride
    @PutMapping("/{id}/cancel")
    public ResponseEntity<RideCreateResponse> cancelRide(@PathVariable Long id) {

        return ResponseEntity.ok(rideService.cancelRide(id));
    }

    //  Get ride by ID
    @GetMapping("/{id}")
    public ResponseEntity<RideCreateResponse> getRideById(@PathVariable Long id) {

        return ResponseEntity.ok(rideService.getRideById(id));
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<RideCreateResponse>> getRidesByDriver(@PathVariable Long driverId) {
        List<RideCreateResponse> rides = rideService.getRidesByDriverId(driverId);
        return ResponseEntity.ok(rides);
    }
    
    @GetMapping("/status")
    public ResponseEntity<List<RideCreateResponse>> getRidesByStatus(
            @RequestParam(required = false) RideStatus status) {

        List<RideCreateResponse> rides = rideService.getRidesByStatus(status);
        return ResponseEntity.ok(rides);
    }
    
    
    
}
