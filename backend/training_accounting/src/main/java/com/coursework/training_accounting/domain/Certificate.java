package com.coursework.training_accounting.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table
// @Data // if it still does not work... suffer p.s. i do
@EqualsAndHashCode(of = {"id"})
@Embeddable
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;

    private String name;

    private String description;

    private int daysValid;

    private int trainingDurationDays;

    @OneToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public int getTrainingDurationDays() {
        return trainingDurationDays;
    }

    public void setTrainingDurationDays(int trainingDurationDays) {
        this.trainingDurationDays = trainingDurationDays;
    }

    public Certificate() {
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

    public int getDaysValid() {
        return daysValid;
    }

    public void setDaysValid(int daysValid) {
        this.daysValid = daysValid;
    }
}
