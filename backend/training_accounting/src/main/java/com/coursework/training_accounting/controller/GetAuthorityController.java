package com.coursework.training_accounting.controller;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class GetAuthorityController {
    @RequestMapping("/api/getauthority")
    public Set<String> getAuthorities() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Set<String> userRoles;
        if (principal instanceof UserDetails) {
            userRoles = ((UserDetails)principal).getAuthorities().stream().map(Object::toString).collect(Collectors.toSet());
        } else {
            userRoles = Set.of();
        }
        return userRoles;
    }
}
