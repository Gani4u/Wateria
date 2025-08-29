package com.mittupani.wateria.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "mysecretkeymysecretkeymysecretkey"; // keep in env/props
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 1 day

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // ✅ Helper 1: Extract token from request header
    public String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    // ✅ Helper 2: Build Authentication object from token
    public Authentication getAuthentication(String token) {
        String username = extractUsername(token);
        return new UsernamePasswordAuthenticationToken(
                new User(username, "", Collections.emptyList()),
                null,
                Collections.emptyList()
        );
    }
}
