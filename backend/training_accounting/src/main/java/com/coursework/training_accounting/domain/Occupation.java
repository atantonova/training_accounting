package com.coursework.training_accounting.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@ToString(exclude = {"id"})
@EqualsAndHashCode(of = {"id"})
public class Occupation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String name;
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "required_certificates",
            joinColumns = @JoinColumn(name = "occupation_id"),
            inverseJoinColumns = @JoinColumn(name = "certificate_id"))
    private Set<Certificate> requiredCertificates;

    @OneToOne
    @JoinColumn(name = "column_id")
    private Company company;


    public Occupation(String name, String description, Set<Certificate> requiredCertificates, Company company) {
        this.name = name;
        this.description = description;
        this.requiredCertificates = requiredCertificates;
        this.company = company;
    }

    public Occupation() {
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public Set<Certificate> getRequiredCertificates() {
        return requiredCertificates;
    }

    public void setRequiredCertificates(Set<Certificate> requiredCertificates) {
        this.requiredCertificates = requiredCertificates;
    }
}
