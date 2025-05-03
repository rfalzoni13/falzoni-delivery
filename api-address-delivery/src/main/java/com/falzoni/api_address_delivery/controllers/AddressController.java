package com.falzoni.api_address_delivery.controllers;

import com.falzoni.api_address_delivery.entities.Address;
import com.falzoni.api_address_delivery.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService service;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        try {
            List<Address> list = this.service.findAll();
            return ResponseEntity.ok(list);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> find(@PathVariable(name = "id") int id) {
        try {
            Address obj = this.service.find(id);
            return ResponseEntity.ok(obj);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody Address obj) {
        try {
            this.service.insert(obj);
            return ResponseEntity.status(201).body("Registro criado com sucesso!");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody Address obj) {
        try {
            if(obj.getId() == 0) {
                throw new Exception("Id ausente! Para criação de um novo registro, deve-se utilizar o método POST");
            }
            this.service.update(obj);
            return ResponseEntity.ok("Registro atualizado com sucesso!");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(name = "id") int id) {
        try {
            this.service.delete(id);
            return ResponseEntity.ok("Registro removido com sucesso!");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
