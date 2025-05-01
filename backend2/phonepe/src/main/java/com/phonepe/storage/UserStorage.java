package com.phonepe.storage;

import java.util.HashMap;

import com.phonepe.model.Accept;

public class UserStorage {
    private static HashMap<String , Accept> users=new HashMap<>();
    
    public static void addUser(Accept user){
        System.out.println("Adding user: " + user);
        users.put(user.getUserId(),user);
    }

    public static Accept getUser(String userId){
        return users.get(userId);

    }
    public static HashMap<String , Accept> getAllUser(){
        return users;
    }

   
    
}
