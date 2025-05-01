package com.phonepe.model;


public class Borrower {
    private String name;
    private String location;
    private double roi;
    private int duration;
    private double amount;

    // Constructors, getters, setters
    public Borrower(String name, String location, double roi, int duration, double amount) {
        this.name = name;
        this.location = location;
        this.roi = roi;
        this.duration = duration;
        this.amount = amount;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public double getRoi() {
        return roi;
    }
    public void setRoi(double roi) {
        this.roi = roi;
    }
    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    @Override
    public String toString() {
        return "Borrower{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", roi=" + roi +
                ", duration=" + duration +
                ", amount=" + amount +
                '}';
    }
    public String toJson() {
        return "{" +
                "\"name\":\"" + name + "\"," +
                "\"location\":\"" + location + "\"," +
                "\"roi\":" + roi + "," +
                "\"duration\":" + duration + "," +
                "\"amount\":" + amount +
                "}";
    }
}
