package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.domain.Certificate;
import com.coursework.training_accounting.domain.CertificateOwning;
import com.coursework.training_accounting.domain.User;
import com.coursework.training_accounting.dto.CertOwnDto;
import com.coursework.training_accounting.exception.BadRequestException;
import com.coursework.training_accounting.repo.CertificateOwningRepo;
import com.coursework.training_accounting.repo.CertificateRepo;
import com.coursework.training_accounting.repo.UserRepo;
import com.coursework.training_accounting.security.UserDetailsImpl;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/cert_own/")
@CrossOrigin(origins = "*")
public class CertificateOwningController {
    @Value("${upload.path}")
    private String uploadPath;

    private final CertificateOwningRepo certificateOwningRepo;
    private final UserRepo userRepo;
    private final CertificateRepo certificateRepo;
    @Autowired
    public CertificateOwningController(CertificateOwningRepo certificateOwningRepo,
                                       UserRepo userRepo,
                                       CertificateRepo certificateRepo) {
        this.certificateOwningRepo = certificateOwningRepo;
        this.userRepo = userRepo;
        this.certificateRepo = certificateRepo;
    }

    @GetMapping("/self")
    public Iterable<CertificateOwning> getCurrentUserCertificates() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        return certificateOwningRepo.findAllByOwner(user);
    }

    @GetMapping("/self/{id}")
    public CertificateOwning getOne(@PathVariable("id") CertificateOwning certificateOwning) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());

        if (certificateOwning.getOwner().getId() == user.getId()
                || certificateOwning.getOwner().getSupervisor().getId() == user.getId()){
            return certificateOwning;
        }
        else
            throw new BadRequestException();

    }

    @GetMapping(value = "/self/file/{id}")
    public byte[] getOnesFile(@PathVariable("id") CertificateOwning certificateOwning) {
        try {
            InputStream in = new FileInputStream(new File(uploadPath + "/" + certificateOwning.getFilename()));
            return IOUtils.toByteArray(in);
        } catch (IOException | NullPointerException e) {
            // e.printStackTrace();
            return null;
        }
    }

    @PostMapping(value="/self",
            produces=MediaType.APPLICATION_JSON_VALUE,
            consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public CertificateOwning create(@RequestPart("jsonBodyData") CertOwnDto certOwnDto, @RequestPart(name="file", required = false) MultipartFile file) {
        Certificate certificate = certificateRepo.findByName(certOwnDto.getCertificateName());
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        CertificateOwning certificateOwning = new CertificateOwning(user, certificate, certOwnDto.getDateReceived());
        setFiles(certificateOwning, file);

        return certificateOwningRepo.save(certificateOwning);
    }

    @PutMapping("/self/{id}")
    public CertificateOwning update(@PathVariable("id") CertificateOwning certificateOwning,
                                    @RequestPart(value = "date_received", required = false) Date dateReceived,
                                    @RequestPart(value = "file", required = false) MultipartFile file) {
        setFiles(certificateOwning, file);
        certificateOwning.setDateReceived(dateReceived);
        return certificateOwningRepo.save(certificateOwning);
    }

    @DeleteMapping("/self/{id}")
    public void delete(@PathVariable("id") CertificateOwning certificateOwning) {
        certificateOwningRepo.delete(certificateOwning);
    }

    private void setFiles(CertificateOwning certificateOwning, MultipartFile file) {
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists())
                uploadDir.mkdir();

            String uuidFile = UUID.randomUUID().toString();
            String resFilename = uuidFile + "." + file.getOriginalFilename();

            try {
            file.transferTo(new File(uploadPath + "/" + resFilename));

                certificateOwning.setFilename(resFilename);
            } catch (IOException e) {
                throw new BadRequestException();
            }
        }
    }

    @GetMapping("/employees")
//    @PreAuthorize("hasRole('SUPERVISOR')")
    public Iterable<CertificateOwning> getEmployeesCertificates() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User supervisor = userRepo.findUserByUsername(((UserDetailsImpl)principal).getUsername());
        Iterable<User> employees = userRepo.findAllBySupervisor(supervisor);
        Set<CertificateOwning> allEmployeesCertificates = new HashSet<>();
        for (User user : employees) {
            allEmployeesCertificates.addAll(
                    (Collection<? extends CertificateOwning>) certificateOwningRepo.findAllByOwner(user));
        }

        return allEmployeesCertificates;
    }
}
