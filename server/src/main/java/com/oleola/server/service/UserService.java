package com.oleola.server.service;

import com.oleola.server.model.User;
import com.oleola.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    @Autowired
    private UserRepository repository;

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public User save(User newUser) {
        return repository.save(newUser);
    }

    @Override
    public User findUserByMail(String mail) {
        User user = (User) repository.findUserByMail(mail);
        return user;
    }

    @Override
    public User checkPassword(String password) {
        User user = (User) repository.checkPassword(password);
        return user;
    }

    @Override
    public User isUser(LinkedHashMap<String, String> arr) {
        String password = arr.get("password");
        User user = checkPassword(password);

        return user;
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void changeServicesById(String services, Long id) {
        repository.changeServicesById(services, id);
    }
}
