package com.phonepe.storage;

import com.phonepe.model.CreditRole;
import java.util.HashMap;

public class CreditRoleStorage {
    private static HashMap<String, CreditRole> creditRoles = new HashMap<>();

    public static void addCreditRole(CreditRole creditRole) {
        System.out.println("Adding credit role: " + creditRole);
        creditRoles.put(creditRole.getId(), creditRole);
    }

    public static CreditRole getCreditRole(String roleId) {
        return creditRoles.get(roleId);
    }

    public static HashMap<String, CreditRole> getAllCreditRoles() {
        return creditRoles;
    }

    public static void removeCreditRole(String roleId) {
        creditRoles.remove(roleId);
    }
}
