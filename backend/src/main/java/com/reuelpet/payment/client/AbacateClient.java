package com.reuelpet.payment.client;

import com.reuelpet.payment.dto.AbacateRequest;
import com.reuelpet.payment.dto.AbacateResponse;
import feign.Headers;
import feign.RequestLine;
import feign.Param;

public interface AbacateClient {
    @RequestLine("POST /billing/create")
    @Headers({
        "Content-Type: application/json",
        "Authorization: Bearer {token}"
    })
    AbacateResponse createBilling(@Param("token") String token, AbacateRequest request);
}