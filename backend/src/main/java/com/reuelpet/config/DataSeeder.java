package com.reuelpet.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.reuelpet.model.Product;
import com.reuelpet.model.enums.PetSpecies;
import com.reuelpet.model.enums.ProductCategory;
import com.reuelpet.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataSeeder {

    @Bean
    @ConditionalOnProperty(name = "app.seed.products", havingValue = "true")
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            if (repository.count() > 0) {
                return;
            }

            List<Product> products = new ArrayList<>();

            products.addAll(List.of(
                product("Ração Premium Cães Adultos 15kg", "159.90", "139.90", "/images/racao_1.png", ProductCategory.PROMO, Set.of(PetSpecies.DOG), 42),
                product("Areia Higiênica Ultra Fina 12kg", "89.90", "74.90", "/images/racao_2.png", ProductCategory.PROMO, Set.of(PetSpecies.CAT), 58),
                product("Coleira Antipulgas Cães", "69.90", "59.90", "/images/pet_toy_1.png", ProductCategory.PROMO, Set.of(PetSpecies.DOG), 36),
                product("Brinquedo Interativo para Gatos", "49.90", "39.90", "/images/pet_toy_2.png", ProductCategory.PROMO, Set.of(PetSpecies.CAT), 28),
                product("Alpiste Especial para Pássaros 1kg", "24.90", "19.90", "/images/produto_higiene_1.jpg", ProductCategory.PROMO, Set.of(PetSpecies.BIRD), 74),
                product("Ração Flutuante para Peixes 500g", "34.90", "28.90", "/images/racao_3.png", ProductCategory.PROMO, Set.of(PetSpecies.FISH), 65),
                product("Feno Premium para Coelhos 1,5kg", "54.90", "44.90", "/images/pet-food-in-bowl-png.png", ProductCategory.PROMO, Set.of(PetSpecies.RABBIT), 31),
                product("Mix de Sementes para Hamster 500g", "29.90", "24.90", "/images/racao_4.png", ProductCategory.PROMO, Set.of(PetSpecies.HAMSTER), 47),
                product("Kit Higiene para Furão", "79.90", "67.90", "/images/pet_higiene_1.jpg", ProductCategory.PROMO, Set.of(PetSpecies.EXOTIC), 18),
                product("Tapete Higiênico Cães 30un", "64.90", "52.90", "/images/pet_unha_1.jpg", ProductCategory.PROMO, Set.of(PetSpecies.DOG), 52)
            ));

            products.addAll(List.of(
                product("Petisco Natural Cães 300g", "26.90", "21.90", "/images/pet_higiene_1.jpg", ProductCategory.RECOMMENDED, Set.of(PetSpecies.DOG), 73),
                product("Sachê Gourmet Gatos 85g", "8.90", "6.90", "/images/pet_toy_2.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.CAT), 120),
                product("Escova Dental Pet", "19.90", "15.90", "/images/produto_higiene_1.jpg", ProductCategory.RECOMMENDED, Set.of(PetSpecies.DOG, PetSpecies.CAT), 49),
                product("Comedouro Duplo Inox", "44.90", "37.90", "/images/pet-food-in-bowl-png.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.DOG, PetSpecies.CAT), 37),
                product("Bebedouro Automático para Gatos", "129.90", "109.90", "/images/pet_banho_1.jpg", ProductCategory.RECOMMENDED, Set.of(PetSpecies.CAT), 21),
                product("Ração para Calopsita 700g", "22.90", "18.90", "/images/racao_2.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.BIRD), 55),
                product("Cascalho Natural para Aquário 2kg", "39.90", "32.90", "/images/racao_3.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.FISH), 40),
                product("Toca Conforto para Coelho", "74.90", "62.90", "/images/pet_banho_1.jpg", ProductCategory.RECOMMENDED, Set.of(PetSpecies.RABBIT), 19),
                product("Roda de Exercício para Hamster", "59.90", "49.90", "/images/pet_toy_1.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.HAMSTER), 26),
                product("Shampoo Neutro Filhotes", "34.90", "28.90", "/images/pet_higiene_1.jpg", ProductCategory.RECOMMENDED, Set.of(PetSpecies.DOG), 34),
                product("Mordedor Resistente para Cães", "31.90", "26.90", "/images/pet_toy_1.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.DOG), 61),
                product("Arranhador Compacto para Gatos", "89.90", "75.90", "/images/pet_toy_2.png", ProductCategory.RECOMMENDED, Set.of(PetSpecies.CAT), 16)
            ));

            for (int index = 0; index < products.size(); index++) {
                products.get(index).setSortOrder(index + 1);
            }

            repository.saveAll(products);
            System.out.println("✅ Initial product seed loaded.");
        };
    }

    private Product product(
        String title,
        String price,
        String subscriberPrice,
        String image,
        ProductCategory category,
        Set<PetSpecies> petSpecies,
        Integer stockQuantity
    ) {
        Product p = new Product();
        p.setTitle(title);
        p.setPrice(new BigDecimal(price));
        p.setSubscriberPrice(new BigDecimal(subscriberPrice));
        p.setImage(image);
        p.setCategory(category);
        p.setPetSpecies(petSpecies);
        p.setStockQuantity(stockQuantity);
        return p;
    }
}