package com.coursework.training_accounting.controller;

import com.coursework.training_accounting.TrainingAccountingApplication;
import com.coursework.training_accounting.domain.ERole;
import com.coursework.training_accounting.domain.User;
import com.coursework.training_accounting.dto.UserDto;
import com.coursework.training_accounting.repo.RoleRepo;
import com.coursework.training_accounting.repo.UserRepo;
import com.coursework.training_accounting.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/usr/")
@CrossOrigin(origins = "*")
public class UserController extends AbstractRestController<User>{
    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    public UserController(UserRepo userRepo) {
        this.repo = userRepo;
    }

    @GetMapping("/current")
    public User getCurrentUser() {
        UserDetailsImpl principal = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ((UserRepo)repo).findUserByUsername(principal.getUsername());
    }

    @CrossOrigin("http://localhost:3000")
    @GetMapping("/employees")
    public Iterable<User> getAllEmployees() {
        UserDetailsImpl principal = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User supervisor = ((UserRepo)repo).findUserByUsername(principal.getUsername());
        return ((UserRepo)repo).findAllBySupervisor(supervisor);
    }

    @Override
    public Iterable<User> getAll() {
        UserDetailsImpl principal = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User admin = ((UserRepo)repo).findUserByUsername(principal.getUsername());
        // System.out.println(admin.getCompany().getName());
        return ((UserRepo)repo).findAllByCompany(admin.getCompany());
    }

    @Override
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") User object) {
        UserDetailsImpl principal = (UserDetailsImpl)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (object.getUsername().equals(principal.getUsername()))
            return;

        User supervisor = object.getSupervisor();
        Iterable<User> employees = ((UserRepo)repo).findAllBySupervisor(supervisor);
        boolean flag = true;
        for (var e : employees) {
            if (e.getId() != object.getId()) {
                flag = false;
                break;
            }
        }
        if (flag) {
            supervisor.getRoles().remove(roleRepo.findByName(ERole.SUPERVISOR));
            repo.save(supervisor);
        }
            repo.delete(object);
    }
}
