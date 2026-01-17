package com.reuelpet.reuelpet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.reuelpet.reuelpet.model.InstagramPost;
import com.reuelpet.reuelpet.repository.InstagramPostRepository;

import java.util.List;

@RestController
@RequestMapping("/api/instagram_links")
@CrossOrigin(origins = "http://localhost:3000")
public class IntagramPostController {

    @Autowired
    private InstagramPostRepository instagramPostRepository;

    @GetMapping
    public List<InstagramPost> getAllProducts() {
        return instagramPostRepository.findAll();
    }
}