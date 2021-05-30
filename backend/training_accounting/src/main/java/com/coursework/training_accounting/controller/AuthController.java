package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.domain.*;
import com.coursework.training_accounting.repo.CompanyRepo;
import com.coursework.training_accounting.repo.OccupationRepo;
import com.coursework.training_accounting.repo.RoleRepo;
import com.coursework.training_accounting.repo.UserRepo;
import com.coursework.training_accounting.security.JwtUtils;
import com.coursework.training_accounting.security.UserDetailsImpl;
import com.coursework.training_accounting.security.requset.LoginRequest;
import com.coursework.training_accounting.security.requset.SignupRequest;
import com.coursework.training_accounting.security.response.JwtResponse;
import com.coursework.training_accounting.security.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    OccupationRepo occupationRepo;

    @Autowired
    CompanyRepo companyRepo;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Ошибка: Пользователь с таким логином уже существует!"));
        }

        // Create new user's account
        User supervisor = userRepository.findUserByUsername(signUpRequest.getSupervisorUsername());
        Occupation occupation = occupationRepo.findByName(signUpRequest.getOccupation());
        Company company = companyRepo.findByName(signUpRequest.getCompanyName());
        if (company == null)
            company = supervisor.getCompany();
        if (company == null) {
            try {
                Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                User admin = userRepository.findUserByUsername(((UserDetailsImpl)principal).getUsername());
                company = admin.getCompany();
            }
            catch (Exception ignored) {

            }
        }

        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getMiddleName(),
                signUpRequest.getEmailAddress(),
                supervisor,
                signUpRequest.getDateStartWorking(),
                signUpRequest.getPhoneNumber(),
                occupation,
                company);

        if (supervisor != null) {
            supervisor.getRoles().add(roleRepository.findByName(ERole.SUPERVISOR));
            userRepository.save(supervisor);
        }

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.USER);
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ADMIN);
                        roles.add(adminRole);

                        break;
                    case "supervisor":
                        Role modRole = roleRepository.findByName(ERole.SUPERVISOR);
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.USER);
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Пользователь успешно зарегистрирован!"));
    }
}
