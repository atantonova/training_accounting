package com.coursework.training_accounting.domain;

import org.springframework.security.core.GrantedAuthority;

public enum ERole implements GrantedAuthority {
    ADMIN,
    SUPERVISOR,
    USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
