package sheridan.gavin.librarydataserver.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// This config is primarily for showing what displays on SwaggerUI!
@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Library Data API")
                        .version("1.0")
                        .description("API for accessing book data!")
                );
    }
}
