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
@Table(name = "trade")
@EntityListeners(AuditingEntityListener.class)
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id", nullable = false)
    private Integer id_user;

    @Column(name = "symbol", nullable = false)
    private String symbol;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "price", nullable = false)
    private String price;

    @Column(name = "day_high", nullable = false)
    private String day_high;

    @Column(name = "day_low", nullable = false)
    private String day_low;

    @Column(name = "volume", nullable = false)
    private String volume;

    @Column(name = "stock_exchange", nullable = false)
    private String stock_exchange;
}
