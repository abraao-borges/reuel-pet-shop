package com.reuelpet.payment.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AbacatePayCustomerDTO {
    private String name;
    private String cellphone;
    private String taxId;
    private String email;
}
