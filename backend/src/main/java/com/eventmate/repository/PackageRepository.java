package com.eventmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.model.Package;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
}