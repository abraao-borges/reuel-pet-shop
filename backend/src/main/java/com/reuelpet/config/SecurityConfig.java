package com.reuelpet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (REQUIRED for Postman POST requests)
            .csrf(csrf -> csrf.disable())
            
            // 2. Enable CORS
            .cors(cors -> {})
            
            // 3. Permissions
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(new AntPathRequestMatcher("/api/payment/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/products/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
                .anyRequest().authenticated()
            )
            
            // 4. Needed for H2
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }
}