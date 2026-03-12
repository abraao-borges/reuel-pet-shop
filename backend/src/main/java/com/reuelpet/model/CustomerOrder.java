package com.reuelpet.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.reuelpet.model.enums.OrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customer_orders")
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderCode;

    private String customerName;

    private String customerPhone;

    private String customerEmail;

    private String deliveryAddress;

    private String paymentMethod;

    private BigDecimal totalAmount;

    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String itemsJson; // Store order items as JSON for display

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}

