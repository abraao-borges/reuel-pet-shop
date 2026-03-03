package com.reuelpet.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reuelpet.model.CustomerOrder;
import com.reuelpet.model.enums.OrderStatus;
import com.reuelpet.service.CustomerOrderService;

import lombok.Data;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://reuel-pet-shop.vercel.app"}, allowCredentials = "true")
public class AdminOrderController {

    private final CustomerOrderService customerOrderService;

    public AdminOrderController(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @GetMapping
    public List<CustomerOrder> listOrders() {
        return customerOrderService.listOrders();
    }

    @PutMapping("/{id}/status")
    public CustomerOrder updateStatus(@PathVariable Long id, @RequestBody UpdateOrderStatusRequest request) {
        return customerOrderService.updateStatus(id, request.getStatus());
    }
}

@Data
class UpdateOrderStatusRequest {
    private OrderStatus status;
}
