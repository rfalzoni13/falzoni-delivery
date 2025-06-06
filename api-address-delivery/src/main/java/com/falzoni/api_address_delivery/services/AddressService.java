package com.falzoni.api_address_delivery.services;

import com.falzoni.api_address_delivery.entities.Address;
import com.falzoni.api_address_delivery.repositories.AddressRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.ObjectNotFoundException;
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
        Address obj = this.repository.findById(id).orElse(null);
        if(obj == null) {
            throw new EntityNotFoundException("Registro não econtrado!");
        }
        return obj;
    }

    public void insert(Address obj) throws Exception {
        if(obj.getId() > 0) {
            throw new IllegalArgumentException("Id identificado! Para atualização, deve-se utilizar o método PUT");
        }

        this.validate(obj);

        this.repository.save(obj);
    }

    public void update(Address obj) throws Exception {
        if(obj.getId() == 0) {
            throw new Exception("Id ausente! Para criação de um novo registro, deve-se utilizar o método POST");
        }

        this.validate(obj);

        this.repository.save(obj);
    }

    public void delete(int id) {
        if(!this.repository.existsById(id)) {
            throw new EntityNotFoundException("Registro não econtrado!");
        }

        this.repository.deleteById(id);
    }

    // private Methods
    private void validate(Address obj) {
        if(obj.getName() == null) {
            throw new NullPointerException("O nome da rua do endereço é obrigatório");
        }
        if(obj.getNumber() <= 0) {
            throw new NullPointerException("O número do endereço é obrigatório");
        }
        if(obj.getNeighborhood() == null) {
            throw new NullPointerException("O bairro do endereço é obrigatório");
        }
        if(obj.getCity() == null) {
            throw new NullPointerException("A cidade do endereço é obrigatória");
        }
        if(obj.getState() == null) {
            throw new NullPointerException("O estado do endereço é obrigatório");
        }
        if(obj.getPostalCode() == null) {
            throw new NullPointerException("O CEP do endereço é obrigatório");
        }
    }
}
