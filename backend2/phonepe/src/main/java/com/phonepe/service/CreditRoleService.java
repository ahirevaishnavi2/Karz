package com.phonepe.service;

import com.phonepe.model.CreditRole;
import com.phonepe.repository.CreditRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreditRoleService {

    @Autowired
    private CreditRoleRepository creditRoleRepository;

    // Save or update role
    public CreditRole saveCreditRole(CreditRole creditRole) {
        return creditRoleRepository.save(creditRole);
    }

    // Get roles by userId
    public List<CreditRole> getRolesByUser(String userId) {
        return creditRoleRepository.findAll().stream()
                .filter(role -> role.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    // Get all roles
    public List<CreditRole> getAllRoles() {
        return creditRoleRepository.findAll();
    }

    // Delete a role by ID
    public void deleteRole(String id) {
        creditRoleRepository.deleteById(id);
    }
}

