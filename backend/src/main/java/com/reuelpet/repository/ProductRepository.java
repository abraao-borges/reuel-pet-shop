package com.reuelpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reuelpet.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // You can add custom finders here later, e.g.:
    // List<Product> findByType(String type);
}