package com.phonepe.controller;

import com.phonepe.model.CreditRole;
import com.phonepe.service.CreditRoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class CreditRoleController {
    private final CreditRoleService creditRoleService;

    public CreditRoleController(CreditRoleService creditRoleService) {
        this.creditRoleService = creditRoleService;
    }

    // Create or update role
    @PostMapping("/submit")
    public String submitRole(@RequestBody CreditRole creditRole) {
        creditRoleService.saveCreditRole(creditRole);
        return "Role saved successfully!";
    }

    // Get roles by user ID
    @GetMapping("/user/{userId}")
    public List<CreditRole> getUserRoles(@PathVariable String userId) {
        return creditRoleService.getRolesByUser(userId);
    }

    // Get all roles (optional)
    @GetMapping("/all")
    public List<CreditRole> getAllRoles() {
        return creditRoleService.getAllRoles();
    }

    // Delete a role
    @DeleteMapping("/{id}")
    public String deleteRole(@PathVariable String id) {
        creditRoleService.deleteRole(id);
        return "Role deleted successfully!";
    }
}
