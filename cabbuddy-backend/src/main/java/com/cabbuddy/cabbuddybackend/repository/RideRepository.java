package com.cabbuddy.cabbuddybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cabbuddy.cabbuddybackend.entity.Ride;

public interface RideRepository extends JpaRepository<Ride, Long> {

}
