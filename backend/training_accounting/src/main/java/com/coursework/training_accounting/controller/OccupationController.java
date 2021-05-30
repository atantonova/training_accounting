package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.Occupation;
import com.coursework.training_accounting.domain.User;
import com.coursework.training_accounting.dto.OccupationDto;
import com.coursework.training_accounting.repo.CertificateRepo;
import com.coursework.training_accounting.repo.OccupationRepo;
import com.coursework.training_accounting.repo.UserRepo;
import com.coursework.training_accounting.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/occupation/")
@CrossOrigin(origins = "*")
public class OccupationController {
    private final CertificateRepo certificateRepo;
    private final OccupationRepo occupationRepo;
    private final UserRepo userRepo;

    @Autowired
    public OccupationController(OccupationRepo occupationRepo,
                                CertificateRepo certificateRepo,
                                UserRepo userRepo) {
        this.occupationRepo = occupationRepo;
        this.certificateRepo = certificateRepo;
        this.userRepo = userRepo;
    }

    @PostMapping
    public Occupation create(@RequestBody OccupationDto dto) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        Set<Certificate> certificates = new HashSet<>();
        for (String certName : dto.getRequiredCertificates())
            certificates.add(certificateRepo.findByName(certName));
        Occupation occupation = new Occupation(dto.getName(), dto.getDescription(), certificates, user.getCompany());
        return occupationRepo.save(occupation);
    }

    @GetMapping
    public Iterable<Occupation> getAll() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        return occupationRepo.findAllByCompany(user.getCompany());
    }

    @DeleteMapping("{id}")
    public void deleteByName(@PathVariable(name="id") Occupation occupation) {
        occupationRepo.delete(occupation);
    }
}
