package com.reuelpet.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.reuelpet.model.Product;
import com.reuelpet.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            // Check if data already exists to avoid duplicates on restart
            if (repository.count() == 0) {
                
                // 1. Create Promo Products (Matches your React mock data)
                List<Product> promos = List.of(
                    new Product(null, "Ração Golden Special 15kg", new BigDecimal("149.90"), new BigDecimal("129.90"), "/images/racao_4.png", "PROMO"),
                    new Product(null, "Ração Golden Special 15kg", new BigDecimal("149.90"), new BigDecimal("129.90"), "/images/racao_1.png", "PROMO"),
                    new Product(null, "Ração Golden Special 15kg", new BigDecimal("149.90"), new BigDecimal("129.90"), "/images/racao_2.png", "PROMO"),
                    new Product(null, "Ração Golden Special 15kg", new BigDecimal("149.90"), new BigDecimal("129.90"), "/images/racao_3.png", "PROMO")
                );

                // 2. Create Recommended Products
                List<Product> recommended = List.of(
                    new Product(null, "Spray Bucal Petyc", new BigDecimal("39.90"), new BigDecimal("35.90"), "/images/pet_higiene_1.jpg", "RECOMMENDED"),
                    new Product(null, "Tigela de Ração", new BigDecimal("39.90"), new BigDecimal("35.90"), "/images/pet-food-in-bowl-png.png", "RECOMMENDED"),
                    new Product(null, "Brinquedo Mordedor", new BigDecimal("39.90"), new BigDecimal("35.90"), "/images/pet_toy_1.png", "RECOMMENDED"),
                    new Product(null, "Galinha Brinquedo", new BigDecimal("39.90"), new BigDecimal("35.90"), "/images/pet_toy_2.png", "RECOMMENDED")
                );

                repository.saveAll(promos);
                repository.saveAll(recommended);
                
                System.out.println("✅ Database seeded with initial products!");
            }
        };
    }
}