package com.coursework.training_accounting.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public abstract class AbstractRestController<T> {
    protected CrudRepository<T, Long> repo;

    @GetMapping
    public Iterable<T> getAll() {
        return repo.findAll();
    }

    @GetMapping("{id}")
    public T getOne(@PathVariable("id") T object) {
        return object;
    }

    @PostMapping
    public T create(@RequestBody T object) {
        return repo.save(object);
    }

    @PutMapping("{id}")
    public T update(
            @PathVariable("id") T objectFromDB,
            @RequestBody T object
    ) {
        BeanUtils.copyProperties(object, objectFromDB, "id");
        return repo.save(objectFromDB);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") T object) {
        repo.delete(object);
    }

}
