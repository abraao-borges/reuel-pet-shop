package com.reuelpet.payment.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AbacatePayProductDTO {
    private String externalId;
    private String name;
    private String description;
    private Integer quantity;
    private Long price; // In cents
}
