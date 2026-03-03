package com.reuelpet.service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

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

    public List<Product> listAllForAdmin() {
        return productRepository.findAllByOrderBySortOrderAscIdAsc();
    }

    public Product createProduct(Product product) {
        if (product.getSortOrder() == null) {
            int nextSort = productRepository.findAllByOrderBySortOrderAscIdAsc().size() + 1;
            product.setSortOrder(nextSort);
        }
        product.setId(null);
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updates) {
        Long productId = Objects.requireNonNull(id);
        Product existing = productRepository.findById(productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        existing.setTitle(updates.getTitle());
        existing.setPrice(updates.getPrice());
        existing.setSubscriberPrice(updates.getSubscriberPrice());
        existing.setImage(updates.getImage());
        existing.setCategory(updates.getCategory());
        existing.setPetSpecies(updates.getPetSpecies());
        existing.setStockQuantity(updates.getStockQuantity());
        if (updates.getSortOrder() != null) {
            existing.setSortOrder(updates.getSortOrder());
        }

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        Long productId = Objects.requireNonNull(id);
        if (!productRepository.existsById(productId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productRepository.deleteById(productId);
    }

    public List<Product> reorderProducts(List<Long> orderedIds) {
        List<Product> products = productRepository.findAllByOrderBySortOrderAscIdAsc();
        Map<Long, Product> productMap = products.stream()
            .collect(Collectors.toMap(Product::getId, product -> product));

        for (int index = 0; index < orderedIds.size(); index++) {
            Long id = orderedIds.get(index);
            Product product = productMap.get(id);
            if (product != null) {
                product.setSortOrder(index + 1);
            }
        }

        return productRepository.saveAll(products).stream()
            .sorted((a, b) -> {
                int sortCompare = Integer.compare(
                    a.getSortOrder() != null ? a.getSortOrder() : Integer.MAX_VALUE,
                    b.getSortOrder() != null ? b.getSortOrder() : Integer.MAX_VALUE
                );
                if (sortCompare != 0) return sortCompare;
                return Long.compare(a.getId(), b.getId());
            })
            .toList();
    }
}
