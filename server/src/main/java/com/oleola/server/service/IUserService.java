package com.oleola.server.service;

import com.oleola.server.model.User;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();
    User findUserByMail(String mail);
    Optional<User> findById(Long id);
    User save(User user);
    User checkPassword(String password);
    User isUser(LinkedHashMap<String, String> arr);
    void deleteById(Long id);
    void changeServicesById(String services, Long id);
}
