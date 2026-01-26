package com.cabbuddy.cabbuddybackend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key for signing JWTs (should be long and safe)
    private final String SECRET_KEY = "sgdsdiudgougeyufgeof87r983r7r98hiujkdjksbhkdhi7y87438473984efbjdhsd"; // 32+ chars

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 1️⃣ Generate token
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 2️⃣ Extract email from JWT
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // 3️⃣ Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // 4️⃣ Validate token
    public boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    // 5️⃣ Check if token expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 6️⃣ Extract claims safely
    private Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            // Token invalid, expired, or malformed
            return null;
        }
    }
}
