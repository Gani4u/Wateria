package com.mittupani.wateria.controller;

import com.mittupani.wateria.security.JwtUtil;
import com.mittupani.wateria.security.TokenBlacklistService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    private final TokenBlacklistService tokenBlacklistService;

    public AuthController(TokenBlacklistService tokenBlacklistService) {
        this.tokenBlacklistService = tokenBlacklistService;
    }


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.get("username"),
                            request.get("password")
                    )
            );
            String token = jwtUtil.generateToken(request.get("username"));
            return Map.of("token", token);
        } catch (AuthenticationException e) {
            return Map.of("error", "Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
        }
        return ResponseEntity.ok("Logged out successfully. Token invalidated.");
    }
}
