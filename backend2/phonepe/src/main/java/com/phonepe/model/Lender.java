package com.phonepe.model;


public class Lender {
    private int id;
    private String name;
    private String location;
    private double roi;
    private int maxDuration;
    private double availableAmount;

    public Lender(int id, String name, String location, double roi, int maxDuration, double availableAmount) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.roi = roi;
        this.maxDuration = maxDuration;
        this.availableAmount = availableAmount;
    }

    // Getter and Setter methods

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getMaxDuration() {
        return maxDuration;
    }

    public void setMaxDuration(int maxDuration) {
        this.maxDuration = maxDuration;
    }

    public double getAvailableAmount() {
        return availableAmount;
    }

    public void setAvailableAmount(double availableAmount) {
        this.availableAmount = availableAmount;
    }

    @Override
    public String toString() {
        return "Lender{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", roi=" + roi +
                ", maxDuration=" + maxDuration +
                ", availableAmount=" + availableAmount +
                '}';
    }
}
