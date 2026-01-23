package com.cabbuddy.cabbuddybackend.controller;

import com.cabbuddy.cabbuddybackend.dto.UserRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.UserResponseDTO;
import com.cabbuddy.cabbuddybackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// This controller handles all user related APIs
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") 
// Allow frontend (React) to call backend APIs
public class UserController {

    // Service layer object
    // Controller will call service methods
    private final UserService userService;

    // Constructor injection
    // Spring automatically injects UserService
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // API to register new user
    // Frontend will send user data in request body
    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody UserRequestDTO userDTO) {

        // Passing request DTO to service layer
        // Service will handle validation and saving
        return userService.registerUser(userDTO);
    }

    // API to get user by id
    // id comes from URL path
    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {

        // Call service to fetch user details
        return userService.getUserById(id);
    }

    // API to get all users
    // Mostly used by admin
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {

        // Service returns list of users
        return userService.getAllUsers();
    }

    // API to get users based on role
    // Example: USER, DRIVER, ADMIN
    @GetMapping("/role/{role}")
    public List<UserResponseDTO> getUsersByRole(@PathVariable String role) {

        // Role value comes from URL
        return userService.getUsersByRole(role);
    }

    // API to update user details
    // id from path and updated data from body
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(@PathVariable Long id,
                                      @RequestBody UserRequestDTO userDTO) {

        // Forward update request to service
        return userService.updateUser(id, userDTO);
    }

    // API to delete user
    // Only id is required
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        // Call service to delete user
        userService.deleteUser(id);

        // Simple success message
        return "User deleted successfully";
    }
}
