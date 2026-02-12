package com.reuelpet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for development
            .cors(cors -> {}) // Enable CORS (uses your WebConfig)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll() // Allow everyone to see products
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
}
