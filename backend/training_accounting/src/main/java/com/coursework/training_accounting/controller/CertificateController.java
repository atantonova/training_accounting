package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.Occupation;
import com.coursework.training_accounting.domain.User;
import com.coursework.training_accounting.repo.*;
import com.coursework.training_accounting.security.UserDetailsImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/cert")
// @PreAuthorize("hasRole('admin')")
public class CertificateController {
    @Autowired
    private CertificateOwningRepo certificateOwningRepo;

    @Autowired
    private OccupationRepo occupationRepo;

    @Autowired
    private TrainingGroupRepo trainingGroupRepo;

    @Autowired
    private UserRepo userRepo;

    private final CertificateRepo certificateRepo;

    @Autowired
    public CertificateController(CertificateRepo certificateRepo) {
        this.certificateRepo = certificateRepo;
    }

    @DeleteMapping("{id}")
    @Transactional
    public void delete(Certificate object) {
        certificateOwningRepo.deleteAllByCertificate(object);
        Iterable<Occupation> occupationsWithCert =
                occupationRepo.findAllByRequiredCertificatesContains(object);
        for (var o : occupationsWithCert) {
            o.getRequiredCertificates().remove(object);
            occupationRepo.save(o);
        }

        trainingGroupRepo.deleteAllByCertificate(object);

        certificateRepo.delete(object);
    }

    @PostMapping
    public Certificate create(@RequestBody Certificate object) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        object.setCompany(user.getCompany());
        return certificateRepo.save(object);
    }

    @GetMapping
    public Iterable<Certificate> getAll() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        return (certificateRepo).findAllByCompany(user.getCompany());
    }

    @GetMapping("/occ")
    public Iterable<Certificate> getOccupationCertificates() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        if (user.getOccupation() != null)
            return user.getOccupation().getRequiredCertificates();
        else
            return Set.of();
    }

    @PutMapping("{id}")
    public Certificate update(@PathVariable("id") Certificate certFromDb,
                              @RequestBody Certificate newCert) {
        BeanUtils.copyProperties(newCert, certFromDb, "id");
        return certificateRepo.save(certFromDb);
    }
}
