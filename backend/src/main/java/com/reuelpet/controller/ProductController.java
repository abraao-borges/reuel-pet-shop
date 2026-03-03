package com.reuelpet.controller;

import org.springframework.web.bind.annotation.*;

import com.reuelpet.model.Product;
import com.reuelpet.model.enums.PetSpecies;
import com.reuelpet.model.enums.ProductCategory;
import com.reuelpet.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://reuel-pet-shop.vercel.app"})
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) PetSpecies petSpecies,
        @RequestParam(required = false) ProductCategory category
    ) {
        return productService.searchProducts(query, petSpecies, category);
    }
}