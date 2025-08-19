package com.mittupani.wateria.dto;

public class BulkOrderStatsDTO {

    private Long totalCansGiven;
    private Long totalCansPending;
    private Double totalAmount;
    private Double amountPending;
    private Long pendingUsers;

    public BulkOrderStatsDTO(Long totalCansGiven, Long totalCansPending, Double totalAmount, Double amountPending, Long pendingUsers) {
        this.totalCansGiven = totalCansGiven;
        this.totalCansPending = totalCansPending;
        this.totalAmount = totalAmount;
        this.amountPending = amountPending;
        this.pendingUsers = pendingUsers;
    }

    public Long getTotalCansGiven() {
        return totalCansGiven;
    }

    public void setTotalCansGiven(Long totalCansGiven) {
        this.totalCansGiven = totalCansGiven;
    }

    public Long getTotalCansPending() {
        return totalCansPending;
    }

    public void setTotalCansPending(Long totalCansPending) {
        this.totalCansPending = totalCansPending;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Double getAmountPending() {
        return amountPending;
    }

    public void setAmountPending(Double amountPending) {
        this.amountPending = amountPending;
    }

    public Long getPendingUsers() {
        return pendingUsers;
    }

    public void setPendingUsers(Long pendingUsers) {
        this.pendingUsers = pendingUsers;
    }
}

