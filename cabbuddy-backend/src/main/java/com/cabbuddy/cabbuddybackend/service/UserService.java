package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.UserRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.UserResponseDTO;

import java.util.List;

/*
 Service interface defines WHAT operations are allowed
 Implementation decides HOW
*/
public interface UserService {

    // Register new user
    UserResponseDTO registerUser(UserRequestDTO userDTO);

    // Get user by ID
    UserResponseDTO getUserById(Long id);

    // Get all users
    List<UserResponseDTO> getAllUsers();

    // Get users by role
    List<UserResponseDTO> getUsersByRole(String role);

    // Update user
    UserResponseDTO updateUser(Long id, UserRequestDTO userDTO);

    // Delete user
    void deleteUser(Long id);
}
