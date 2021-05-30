package com.coursework.training_accounting.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

import static org.springframework.util.unit.DataUnit.MEGABYTES;

@Configuration
public class MultipartFileConfig {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        long maxFileSize = 100L;
        long maxRequestSize = 200L;
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.of(maxFileSize ,MEGABYTES));
        factory.setMaxRequestSize(DataSize.of(maxRequestSize ,MEGABYTES));
        return factory.createMultipartConfig();
    }
}
