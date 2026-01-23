package com.cabbuddy.cabbuddybackend.repository;

import com.cabbuddy.cabbuddybackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Repository talks to database
public interface UserRepository extends JpaRepository<User, Long> {

    // Used to find user by email
    Optional<User> findByEmail(String email);

    // Used to get users by role
    List<User> findByRole(String role);
}
