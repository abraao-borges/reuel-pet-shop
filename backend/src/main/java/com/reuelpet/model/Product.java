package com.reuelpet.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

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

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_pet_species", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "pet_species")
    @Enumerated(EnumType.STRING)
    private Set<PetSpecies> petSpecies = new HashSet<>();

    private Integer sortOrder;

    private Integer stockQuantity;
    
}