package com.mittupani.wateria.dto;

public class DailyOrderAddUpDTO {

    private int cansGiven;
    private int cansReturned;
    private Double totalAmount;
    private Double moneyReceived;
    private String note;

    // getters & setters

    public int getCansGiven() { return cansGiven; }
    public void setCansGiven(int cansGiven) { this.cansGiven = cansGiven; }

    public int getCansReturned() { return cansReturned; }
    public void setCansReturned(int cansReturned) { this.cansReturned = cansReturned; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public Double getMoneyReceived() { return moneyReceived; }
    public void setMoneyReceived(Double moneyReceived) { this.moneyReceived = moneyReceived; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
