package com.coursework.training_accounting.dto;

import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

public class CertOwnDto {
    private String certificateName;
    private Date dateReceived;


    public String getCertificateName() {
        return certificateName;
    }

    public void setCertificateName(String certificateName) {
        this.certificateName = certificateName;
    }

    public Date getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(Date dateReceived) {
        this.dateReceived = dateReceived;
    }

    public CertOwnDto(String certificateName, Date dateReceived) {
        this.certificateName = certificateName;
        this.dateReceived = dateReceived;
    }
}
