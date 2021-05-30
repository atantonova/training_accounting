package com.coursework.training_accounting.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class TrainingGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Date dateStart;

    private int daysLong;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cert_id")
    @JsonSerialize(as = Certificate.class)
    private Certificate certificate;

    public TrainingGroup() {
    }

    public TrainingGroup(Date dateStart, int daysLong, Certificate certificate) {
        this.dateStart = dateStart;
        this.daysLong = daysLong;
        this.certificate = certificate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public int getDaysLong() {
        return daysLong;
    }

    public void setDaysLong(int daysLong) {
        this.daysLong = daysLong;
    }

    public Certificate getCertificate() {
        return certificate;
    }

    public void setCertificate(Certificate certificate) {
        this.certificate = certificate;
    }
}
