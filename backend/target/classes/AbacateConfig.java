package com.reuelpet.config;

import com.reuelpet.payment.client.AbacateClient;
import feign.Feign;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AbacateConfig {

    @Value("${abacatepay.api.url}")
    private String apiUrl;

    @Bean
    public AbacateClient abacateClient() {
        return Feign.builder()
                .encoder(new JacksonEncoder())
                .decoder(new JacksonDecoder())
                .target(AbacateClient.class, apiUrl);
    }
}