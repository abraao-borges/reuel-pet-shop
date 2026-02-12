package com.reuelpet.payment.controller;

import com.reuelpet.payment.client.AbacateClient;
import com.reuelpet.payment.dto.AbacateRequest;
import com.reuelpet.payment.dto.AbacateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final AbacateClient abacateClient;

    @Value("${abacatepay.token}")
    private String apiToken;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody Map<String, Object> payload) {
        
        // 1. Extract data from Frontend request
        Double amount = Double.parseDouble(payload.get("amount").toString());
        String email = payload.get("email").toString();
        String name = payload.get("name").toString();

        // 2. Convert to Cents (Abacate uses integers for currency)
        int amountInCents = (int) (amount * 100);

        // 3. Build the request for AbacatePay
        var abacateRequest = new AbacateRequest(
            "ONE_TIME",
            List.of("PIX"),
            List.of(new AbacateRequest.Product("PET123", "Serviço Pet", 1, amountInCents)),
            "http://localhost:3000/success", // Redirect here after success
            "http://localhost:3000/processing",
            new AbacateRequest.Customer(name, email, null)
        );

        // 4. Call API
        try {
            AbacateResponse response = abacateClient.createBilling(apiToken, abacateRequest);
            return ResponseEntity.ok(Map.of("paymentUrl", response.data().url()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}