package com.coursework.training_accounting.dto;

import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Date;

@Data
public class UserDto {
    private String username;

    private String password;

    private String firstName;
    private String middleName;
    private String lastName;
    private String emailAddress;

    private Date dateStartWorking;

    private long supervisorId;
}
