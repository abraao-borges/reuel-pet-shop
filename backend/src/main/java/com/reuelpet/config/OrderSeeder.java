package com.reuelpet.config;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

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
                new CustomerOrder(null, "#98214", "Carlos Silva", "11987654321", "carlos@email.com", "Rua A, 123, São Paulo", "PIX", new BigDecimal("189.80"), LocalDateTime.now().minusDays(2), "[]", OrderStatus.IN_TRANSIT),
                new CustomerOrder(null, "#88102", "Mariana Souza", "21998765432", "mariana@email.com", "Avença B, 456, Rio de Janeiro", "CREDIT_CARD", new BigDecimal("39.90"), LocalDateTime.now().minusDays(15), "[]", OrderStatus.DELIVERED),
                new CustomerOrder(null, "#75001", "Lucas Andrade", "85987654321", "lucas@email.com", "Rua C, 789, Ceará", "PIX", new BigDecimal("85.00"), LocalDateTime.now().minusDays(30), "[]", OrderStatus.CANCELED)
            );

            Iterable<CustomerOrder> safeInitialOrders = Objects.requireNonNull(initialOrders);
            orderRepository.saveAll(safeInitialOrders);
        };
    }
}
