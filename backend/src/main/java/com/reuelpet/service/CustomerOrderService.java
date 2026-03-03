package com.reuelpet.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.reuelpet.model.CustomerOrder;
import com.reuelpet.model.Product;
import com.reuelpet.model.enums.OrderStatus;
import com.reuelpet.payment.dto.AbacatePayCustomerDTO;
import com.reuelpet.repository.CustomerOrderRepository;

@Service
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;

    public CustomerOrderService(CustomerOrderRepository customerOrderRepository) {
        this.customerOrderRepository = customerOrderRepository;
    }

    public List<CustomerOrder> listOrders() {
        return customerOrderRepository.findAllByOrderByCreatedAtDesc();
    }

    public CustomerOrder updateStatus(Long id, OrderStatus status) {
        if (status == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
        }

        Long orderId = Objects.requireNonNull(id);
        CustomerOrder order = customerOrderRepository.findById(orderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        order.setStatus(status);
        return customerOrderRepository.save(order);
    }

    public CustomerOrder createOrderFromCheckout(
        List<Product> products,
        java.util.Map<Long, Integer> quantityMap,
        AbacatePayCustomerDTO customer
    ) {
        BigDecimal totalAmount = products.stream()
            .map(product -> {
                int quantity = quantityMap.getOrDefault(product.getId(), 1);
                return product.getPrice().multiply(BigDecimal.valueOf(quantity));
            })
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        String customerName = customer != null && customer.getName() != null && !customer.getName().isBlank()
            ? customer.getName().trim()
            : "Cliente";

        CustomerOrder order = new CustomerOrder(
            null,
            "#" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase(),
            customerName,
            totalAmount,
            LocalDateTime.now(),
            OrderStatus.CREATED
        );

        return customerOrderRepository.save(order);
    }
}
