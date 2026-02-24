package com.reuelpet.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

import com.reuelpet.model.enums.PetSpecies;
import com.reuelpet.model.enums.ProductCategory;

import lombok.AllArgsConstructor;
import lombok.Data; // Assuming you use Lombok, otherwise add getters/setters
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private BigDecimal price;
    private BigDecimal subscriberPrice; // Maps to your 'subscriberPrice' prop
    private String image; // Store the path, e.g., "/images/racao_4.png"

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @Enumerated(EnumType.STRING)
    private PetSpecies petSpecies;

    private Integer stockQuantity;
    
}