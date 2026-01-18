package com.reuelpet.reuelpet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(org.springframework.security.config.Customizer.withDefaults()) 
            .authorizeHttpRequests(auth -> auth
                // Allow preflight requests for all endpoints
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                // Your API endpoints
                .requestMatchers("/api/**").permitAll()
                // Allow the internal error path so you see real status codes (404, 500)
                .requestMatchers("/error").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
}
