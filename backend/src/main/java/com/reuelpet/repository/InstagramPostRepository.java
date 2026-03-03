package com.reuelpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reuelpet.model.InstagramPost;

@Repository
public interface InstagramPostRepository extends JpaRepository<InstagramPost, Long> {
}
