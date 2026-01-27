package com.cabbuddy.cabbuddybackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            //  CSRF disabled (JWT is stateless)
            .csrf(csrf -> csrf.disable())

            //  Stateless session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            //  Endpoint security
            .authorizeHttpRequests(auth -> auth

                //  Allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                //  Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/rides/**").permitAll()
                .requestMatchers("/api/vehicles/**").permitAll()
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()

                //  Driver-only endpoint
                .requestMatchers("/api/bookings/ride/**").hasRole("DRIVER")

                //  Everything else requires authentication
                .anyRequest().authenticated()
            )

            //  Disable default login forms
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            //  JWT filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    //  Password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
