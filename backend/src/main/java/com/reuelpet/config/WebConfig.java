package com.reuelpet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
<<<<<<< HEAD:backend/src/main/java/com/reuelpet/config/WebConfig.java
                    "http://localhost:3000",
                    "http://localhost:5173", 
                    "https://reuel-pet-shop.vercel.app" // ADD YOUR VERCEL DOMAIN HERE
=======
                    "http://localhost:3000", 
                    "https://reuel-pet-shop.vercel.app"
>>>>>>> 739cb3c92d2a76f75b505a5e38170b8f83d81a56:backend/src/main/java/com/reuelpet/reuelpet/config/WebConfig.java
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}