package com.reuelpet.payment.controller;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reuelpet.model.Product;
import com.reuelpet.payment.dto.AbacatePayCustomerDTO;
import com.reuelpet.payment.dto.ChargeFrequency;
import com.reuelpet.payment.service.AbacatePayService;
import com.reuelpet.repository.ProductRepository;
import com.reuelpet.service.CustomerOrderService;

import lombok.Data;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://reuel-pet-shop.vercel.app"})
public class PaymentController {

    @Autowired
    private AbacatePayService abacatePayService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerOrderService customerOrderService;

    @PostMapping("/checkout")
    public ResponseEntity<Map<String, String>> checkout(@RequestBody CheckoutRequest request) {
        List<CartItem> cartItems = request.getCartItems() != null ? request.getCartItems() : List.of();
        List<Long> productIds = cartItems.stream()
            .map(CartItem::getProductId)
            .filter(Objects::nonNull)
            .toList();
        Iterable<Long> safeProductIds = Objects.requireNonNull(productIds);
        List<Product> products = (List<Product>) productRepository.findAllById(safeProductIds);
        
        // Create a map of productId to quantity for easier lookup
        Map<Long, Integer> quantityMap = cartItems.stream()
            .collect(java.util.stream.Collectors.toMap(CartItem::getProductId, CartItem::getQuantity));
        
        String checkoutUrl = abacatePayService.createCheckout(
            products, 
            quantityMap,
            request.getCustomer(), 
            request.getFrequency(), 
            request.getMethod(),
            request.getReturnUrl(),
            request.getCompletionUrl()
        );

        customerOrderService.createOrderFromCheckout(
            products, 
            quantityMap, 
            request.getCustomer(),
            request.getDeliveryAddress(),
            request.getPaymentMethod()
        );
        
        return ResponseEntity.ok(Map.of("url", checkoutUrl));
    }
}

@Data
class CheckoutRequest {
    private List<CartItem> cartItems;
    private String method; 
    private ChargeFrequency frequency; 
    private String returnUrl;
    private String completionUrl;
    private AbacatePayCustomerDTO customer;
    private String deliveryAddress;
    private String paymentMethod;
}

@Data
class CartItem {
    private Long productId;
    private Integer quantity;
}