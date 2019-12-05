package com.oleola.server.controller;

import com.oleola.server.model.User;
import com.oleola.server.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Array;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    ResourceLoader resourceLoader;

    @GetMapping("/showUsers")
    public ResponseEntity<List<User>> findUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/changeServices", method = RequestMethod.PUT)
    public ResponseEntity create(@RequestParam String services, Long id) {
        System.out.println(services);
        System.out.println(id);
        userService.changeServicesById(services, id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/createUser")
    public ResponseEntity create(@Valid @RequestBody User newUser) {
        newUser.setServices("Profile;");
        return ResponseEntity.ok(userService.save(newUser));
    }

    @GetMapping("/showMail")
    public String findMail() {
        User user = (User) userService.findUserByMail("oleola@mail.com");

        System.out.println(user.getMail());
        return user.getMail();
    }

    @GetMapping("/showPassword")
    public String findPassword() {
        User user = (User) userService.checkPassword("johnspassword");

        System.out.println(user.getMail());
        return user.getPassword();
    }

    /* When user want to log in */
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value ="/checkUser", method = RequestMethod.POST, produces = "application/json")
    public User checkUser(@RequestBody LinkedHashMap<String, String> user) {

        return userService.isUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        if (!userService.findById(id).isPresent()) {
            System.err.println("Id " + id + " doesn't existed");
            ResponseEntity.badRequest().build();
        }
        userService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/about.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public Resource about() {
        return resourceLoader.getResource("classpath:about.json");
    }
}
