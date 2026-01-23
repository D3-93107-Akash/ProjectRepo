package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.VehicleRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.VehicleResponseDTO;

public interface VehicleService {

    VehicleResponseDTO addVehicle(VehicleRequestDTO dto);

    VehicleResponseDTO getVehicleByDriver(Long driverId);

    VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO dto);

    void deleteVehicle(Long id);
}
