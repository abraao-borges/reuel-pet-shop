package com.reuelpet.payment.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.client.RestTemplate;

import com.reuelpet.model.Product;
import com.reuelpet.payment.dto.AbacatePayChargeRequest;
import com.reuelpet.payment.dto.AbacatePayCustomerDTO;
import com.reuelpet.payment.dto.AbacatePayProductDTO;
import com.reuelpet.payment.dto.ChargeFrequency;


@Service
public class AbacatePayService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String API_URL = "https://api.abacatepay.com/v1/billing/create";
    
    @Value("${abacatepay.api.key}")
    private String apiKey;

    public String createCheckout(
        List<Product> products,
        Map<Long, Integer> quantityMap,
        AbacatePayCustomerDTO customer,
        ChargeFrequency frequency,
        String method,
        String returnUrl,
        String completionUrl
    ) {
        List<AbacatePayProductDTO> abacateProducts = products.stream().map(p -> 
            AbacatePayProductDTO.builder()
                .externalId(p.getId().toString())
                .name(p.getTitle())
                .description(p.getCategory() != null ? p.getCategory().name() : "PRODUCT")
                .quantity(quantityMap.getOrDefault(p.getId(), 1))
                .price(p.getPrice().multiply(new BigDecimal(100)).longValue())
                .build()
        ).collect(Collectors.toList());

        AbacatePayChargeRequest request = AbacatePayChargeRequest.builder()
            .frequency(frequency) // Use dynamic frequency
            .methods(List.of(method)) // Wrap the single method in a list
            .products(abacateProducts)
            .customer(customer)
            .returnUrl(returnUrl != null && !returnUrl.isBlank() ? returnUrl : "http://localhost:3000/cart")
            .completionUrl(completionUrl != null && !completionUrl.isBlank() ? completionUrl : "http://localhost:3000/completion")
            .externalId("order_" + System.currentTimeMillis())
            .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(Objects.requireNonNull(apiKey, "abacatepay.api.key is required"));

        HttpEntity<AbacatePayChargeRequest> entity = new HttpEntity<>(request, headers);
        
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
            API_URL,
            Objects.requireNonNull(HttpMethod.POST),
            entity,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> responseBody = response.getBody();
        if (responseBody == null) {
            throw new IllegalStateException("AbacatePay response body is empty");
        }
        
        @SuppressWarnings("unchecked")
        Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
        return (String) data.get("url");
    }
}