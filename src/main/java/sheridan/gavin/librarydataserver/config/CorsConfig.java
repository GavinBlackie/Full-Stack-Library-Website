package sheridan.gavin.librarydataserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// This config allows all the specified HTTP methods for a certain endpoint!
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Opens up /api/ entry/endpoint
                .allowedOriginPatterns("http://localhost:*") // Only accept clients coming from localhost
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // Specifies which HTTP methods are allowed to be processed
    }
}
