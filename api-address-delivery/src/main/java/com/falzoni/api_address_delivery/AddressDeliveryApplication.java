package com.falzoni.api_address_delivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.falzoni.api_address_delivery.repositories")
@EntityScan("com.falzoni.api_address_delivery.entities")
@SpringBootApplication
public class AddressDeliveryApplication {
	public static void main(String[] args) {
		SpringApplication.run(AddressDeliveryApplication.class, args);
	}
}
