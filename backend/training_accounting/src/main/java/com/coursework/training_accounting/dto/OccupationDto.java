package com.coursework.training_accounting.dto;

import java.util.Set;

public class OccupationDto {
    private String name;
    private String description;
    private Set<String> requiredCertificates;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getRequiredCertificates() {
        return requiredCertificates;
    }

    public void setRequiredCertificates(Set<String> requiredCertificates) {
        this.requiredCertificates = requiredCertificates;
    }
}
