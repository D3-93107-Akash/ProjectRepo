package com.cabbuddy.cabbuddybackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);
}
