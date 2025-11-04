package com.eventmate.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.model.Package;
import com.eventmate.service.PackageService;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Long id) {
        Optional<Package> pkg = packageService.getPackageById(id);
        if (pkg.isPresent()) {
            return ResponseEntity.ok(pkg.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Package createPackage(@RequestBody Package pkg) {
        return packageService.savePackage(pkg);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable Long id, @RequestBody Package packageDetails) {
        Optional<Package> pkg = packageService.getPackageById(id);
        if (pkg.isPresent()) {
            Package updatedPackage = pkg.get();
            updatedPackage.setName(packageDetails.getName());
            updatedPackage.setDescription(packageDetails.getDescription());
            updatedPackage.setPrice(packageDetails.getPrice());
            return ResponseEntity.ok(packageService.savePackage(updatedPackage));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}