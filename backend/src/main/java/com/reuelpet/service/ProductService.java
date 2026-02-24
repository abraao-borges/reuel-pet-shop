package com.reuelpet.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.reuelpet.model.Product;
import com.reuelpet.model.enums.PetSpecies;
import com.reuelpet.model.enums.ProductCategory;
import com.reuelpet.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> searchProducts(String query, PetSpecies petSpecies, ProductCategory category) {
        String normalizedQuery = query != null && !query.isBlank() ? query.trim() : null;
        PetSpecies normalizedSpecies = petSpecies != null && petSpecies != PetSpecies.ALL ? petSpecies : null;

        return productRepository.search(normalizedQuery, normalizedSpecies, category);
    }
}
