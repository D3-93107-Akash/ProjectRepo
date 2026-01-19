package com.cabbuddy.cabbuddybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cabbuddy.cabbuddybackend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
