package com.falzoni.api_address_delivery.services;

import com.falzoni.api_address_delivery.entities.Address;
import com.falzoni.api_address_delivery.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressRepository repository;

    public List<Address> findAll() {
        return this.repository.findAll();
    }

    public Address find(int id) {
        return this.repository.findById(id).orElse(null);
    }

    public void insert(Address obj) throws Exception {
        if(obj.getId() > 0) {
            throw new Exception("Id identificado! Para atualização, deve-se utilizar o método PUT");
        }
        this.repository.save(obj);
    }

    public void update(Address obj) throws Exception {
        if(obj.getId() == 0) {
            throw new Exception("Id ausente! Para criação de um novo registro, deve-se utilizar o método POST");
        }
        this.repository.save(obj);
    }

    public void delete(int id) {
        this.repository.deleteById(id);
    }
}
