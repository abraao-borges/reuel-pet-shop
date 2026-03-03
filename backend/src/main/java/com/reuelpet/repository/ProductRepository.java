package com.reuelpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reuelpet.model.Product;
import com.reuelpet.model.enums.PetSpecies;
import com.reuelpet.model.enums.ProductCategory;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByOrderBySortOrderAscIdAsc();

	@Query("""
		SELECT p
		FROM Product p
		WHERE (:query IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')))
		  AND (:category IS NULL OR p.category = :category)
		  AND (
				:petSpecies IS NULL
				OR p.petSpecies = :petSpecies
				OR p.petSpecies = com.reuelpet.model.enums.PetSpecies.ALL
			  )
		ORDER BY p.sortOrder ASC, p.id ASC
	""")
	List<Product> search(
		@Param("query") String query,
		@Param("petSpecies") PetSpecies petSpecies,
		@Param("category") ProductCategory category
	);
}