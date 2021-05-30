package com.coursework.training_accounting.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cert_own")
@EqualsAndHashCode(of = {"id"})
public class CertificateOwning {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    @JsonSerialize(as = User.class)
    private User owner;

    @ManyToOne
    @JoinColumn(name = "certificate_id")
    @JsonSerialize(as = Certificate.class)
    private Certificate certificate;

    @JsonSerialize(as = java.sql.Date.class)
    private java.sql.Date dateReceived;

    private String filename;

    public CertificateOwning() {
    }

    public CertificateOwning(User owner,
                             Certificate certificate,
                             Date dateReceived) {
        this.owner = owner;
        this.certificate = certificate;
        this.dateReceived = dateReceived;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Certificate getCertificate() {
        return certificate;
    }

    public void setCertificate(Certificate certificate) {
        this.certificate = certificate;
    }

    public Date getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(Date dateReceived) {
        this.dateReceived = dateReceived;
    }
}
