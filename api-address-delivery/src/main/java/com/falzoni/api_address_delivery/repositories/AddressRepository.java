package com.falzoni.api_address_delivery.repositories;

import com.falzoni.api_address_delivery.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
