package com.oleola.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "weather")
@EntityListeners(AuditingEntityListener.class)
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private Integer id_user;

    @Column(name = "City", nullable = false)
    private String city;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "temperature", nullable = false)
    private String temperature;

}

