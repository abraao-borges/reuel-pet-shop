package com.reuelpet.payment.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AbacatePayChargeRequest {
    private ChargeFrequency frequency;
    private List<String> methods;
    private List<AbacatePayProductDTO> products;
    private String returnUrl;
    private String completionUrl;
    private AbacatePayCustomerDTO customer;
    private String externalId;
}
