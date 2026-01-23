package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.UserRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.UserResponseDTO;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    // This repository is used to perform DB operations
    // like save, find, delete etc.
    private final UserRepository userRepository;

    // Constructor injection
    // Spring will automatically give repository object
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // This method is used to register a new user
    @Override
    public UserResponseDTO registerUser(UserRequestDTO userDTO) {

        // First we check if email already exists in DB
        // because email should be unique for every user
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Creating User entity object
        // Entity represents the users table
        User user = new User();

        // Copying data from request DTO to entity
        // DTO is coming from frontend
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());

        // Password is stored in DB
        // Later we will encrypt it using BCrypt
        user.setPassword(userDTO.getPassword());

        user.setPhone(userDTO.getPhone());

        // By default every new user will have USER role
        // Frontend should not decide role
        user.setRole("USER");

        // Save user object into database
        User savedUser = userRepository.save(user);

        // Convert entity to response DTO
        // So password is not sent back
        return mapToResponseDTO(savedUser);
    }

    // This method is used to get a user by id
    @Override
    public UserResponseDTO getUserById(Long id) {

        // Try to find user by id
        // If not found, throw exception
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert entity to DTO before returning
        return mapToResponseDTO(user);
    }

    // This method returns all users present in DB
    @Override
    public List<UserResponseDTO> getAllUsers() {

        // Fetch all user entities from DB
        // Convert each entity to response DTO
        return userRepository.findAll()
                .stream()                       // convert list to stream
                .map(this::mapToResponseDTO)    // entity → dto
                .collect(Collectors.toList());  // stream → list
    }

    // This method is used to get users by role
    // Example: USER / DRIVER / ADMIN
    @Override
    public List<UserResponseDTO> getUsersByRole(String role) {

        // Fetch users based on role
        // Then convert entity list to DTO list
        return userRepository.findByRole(role)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // This method is used to update user details
    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO userDTO) {

        // First fetch existing user from DB
        // We update only if user exists
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update only required fields
        // Email and password are not updated here
        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole());

        // Save updated user back to DB
        User updatedUser = userRepository.save(user);

        // Return updated data as DTO
        return mapToResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        // check if user exists before deleting
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // delete only if found
        userRepository.delete(user);
    }


    // This is a common method used to convert
    // User entity into UserResponseDTO
    private UserResponseDTO mapToResponseDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        // Setting only safe fields
        // Password is intentionally not included
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());

        return dto;
    }
}
