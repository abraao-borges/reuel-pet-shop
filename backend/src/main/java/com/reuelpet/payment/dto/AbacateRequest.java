package com.reuelpet.payment.dto;

import java.util.List;

public record AbacateRequest(
    String frequency,       // "ONE_TIME"
    List<String> methods,   // ["PIX"]
    List<Product> products,
    String returnUrl,       // Where user goes after paying
    String completionUrl,   // Where user goes while processing
    Customer customer
) {
    public record Product(String externalId, String name, Integer quantity, Integer price) {} 
    public record Customer(String name, String email, String taxId) {}
}