package com.falzoni.api_address_delivery.controllers;

import com.falzoni.api_address_delivery.entities.Address;
import com.falzoni.api_address_delivery.services.AddressService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> find(@PathVariable(name = "id") int id) {
        try {
            Address obj = this.service.find(id);
            return ResponseEntity.ok(obj);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody Address obj) {
        try {
            this.service.insert(obj);
            return ResponseEntity.created(
                    URI.create(String.format("%s/api/address/%s",
                            ServletUriComponentsBuilder.fromCurrentContextPath().toUriString(), obj.getId())))
                    .build();
        } catch (NullPointerException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody Address obj) {
        try {
            this.service.update(obj);
            return ResponseEntity.noContent().build();
        } catch (NullPointerException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(name = "id") int id) {
        try {
            this.service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }
}
