package com.reuelpet.config;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.reuelpet.model.CustomerOrder;
import com.reuelpet.model.enums.OrderStatus;
import com.reuelpet.repository.CustomerOrderRepository;

@Configuration
public class OrderSeeder {

    @Bean
    @ConditionalOnProperty(name = "app.seed.orders", havingValue = "true")
    CommandLineRunner initOrders(CustomerOrderRepository orderRepository) {
        return args -> {
            if (orderRepository.count() > 0) {
                return;
            }

            List<CustomerOrder> initialOrders = List.of(
                new CustomerOrder(null, "#98214", "Carlos Silva", new BigDecimal("189.80"), LocalDateTime.now().minusDays(2), OrderStatus.IN_TRANSIT),
                new CustomerOrder(null, "#88102", "Mariana Souza", new BigDecimal("39.90"), LocalDateTime.now().minusDays(15), OrderStatus.DELIVERED),
                new CustomerOrder(null, "#75001", "Lucas Andrade", new BigDecimal("85.00"), LocalDateTime.now().minusDays(30), OrderStatus.CANCELED)
            );

            orderRepository.saveAll(initialOrders);
        };
    }
}
