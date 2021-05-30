package com.coursework.training_accounting.security.requset;

import lombok.ToString;

import java.sql.Date;
import java.util.Set;

@ToString(exclude = {})
public class SignupRequest {
    // username, email, password, firstName, lastName, middleName,
    // supervisorUsername, dateStartWorking, phonenumber, occupation

    private String username;
    private String emailAddress;
    private Set<String> role;
    private String password;
    private String firstName;
    private String lastName;
    private String middleName;
    private String supervisorUsername;
    private Date dateStartWorking;
    private String phoneNumber;
    private String occupation;
    private String companyName;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getSupervisorUsername() {
        return supervisorUsername;
    }

    public void setSupervisorUsername(String supervisorUsername) {
        this.supervisorUsername = supervisorUsername;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Date getDateStartWorking() {
        return dateStartWorking;
    }

    public void setDateStartWorking(Date dateStartWorking) {
        this.dateStartWorking = dateStartWorking;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String email) {
        this.emailAddress = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRole() {
        return this.role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }

    public SignupRequest() {
    }
}
