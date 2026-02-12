package com.reuelpet.payment.dto;

public record AbacateResponse(Data data) {
    public record Data(String id, String url, String status) {}
}