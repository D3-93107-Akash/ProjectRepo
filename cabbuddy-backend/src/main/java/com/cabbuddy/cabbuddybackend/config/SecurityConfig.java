package com.cabbuddy.cabbuddybackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF for simplicity (since it's an API)
            .csrf(csrf -> csrf.disable())

            // Permit all ride-related endpoints and Swagger
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/rides/**",          // ✅ Allow all ride APIs
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()
                .anyRequest().authenticated()
            )

            // Disable form login (we don't want HTML login page)
            .formLogin(form -> form.disable())

            // Disable HTTP Basic Auth
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
