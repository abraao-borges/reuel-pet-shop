package com.reuelpet.reuelpet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reuelpet.reuelpet.model.InstagramPost;

@Repository
public interface InstagramPostRepository extends JpaRepository<InstagramPost, Long> {
}