package com.cabbuddy.cabbuddybackend.controller;

import com.cabbuddy.cabbuddybackend.dto.UserRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.UserResponseDTO;
import com.cabbuddy.cabbuddybackend.enums.UserRole;
import com.cabbuddy.cabbuddybackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //  Register
    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody UserRequestDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    //  Get by id
    @GetMapping("/{id}")
    public UserResponseDTO getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //  Get all
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    //  Get by role
    @GetMapping("/role/{role}")
    public List<UserResponseDTO> getUsersByRole(@PathVariable UserRole role) {
        return userService.getUsersByRole(role);
    }

    //  Update
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @RequestBody UserRequestDTO userDTO) {

        return userService.updateUser(id, userDTO);
    }

    //  Delete
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}
