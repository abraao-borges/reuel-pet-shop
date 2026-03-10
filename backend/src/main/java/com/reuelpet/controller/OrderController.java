package com.reuelpet.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reuelpet.model.CustomerOrder;
import com.reuelpet.service.CustomerOrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://reuel-pet-shop.vercel.app"})
public class OrderController {

    private final CustomerOrderService customerOrderService;

    public OrderController(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @GetMapping
    public List<CustomerOrder> listOrders() {
        return customerOrderService.listOrders();
    }
}
