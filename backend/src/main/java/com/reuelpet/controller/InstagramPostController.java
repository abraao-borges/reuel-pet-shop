package com.reuelpet.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reuelpet.model.InstagramPost;
import com.reuelpet.repository.InstagramPostRepository;

@RestController
@RequestMapping("/api/instagram_links")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://reuel-pet-shop.vercel.app"})
public class InstagramPostController {

    private final InstagramPostRepository instagramPostRepository;

    public InstagramPostController(InstagramPostRepository instagramPostRepository) {
        this.instagramPostRepository = instagramPostRepository;
    }

    @GetMapping
    public List<String> getAllLinks() {
        return instagramPostRepository.findAll()
            .stream()
            .map(InstagramPost::getLink)
            .toList();
    }
}
