package sheridan.gavin.librarydataserver.data;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import sheridan.gavin.librarydataserver.domain.Book;
import sheridan.gavin.librarydataserver.repo.BookRepo;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@Component
@Slf4j
public class LibraryDatabaseInitializer {

    @Value("classpath:data/library.json")
    private Resource libraryResourceFile;

    private final BookRepo bookRepo;
    private final ObjectMapper objectMapper;

    public LibraryDatabaseInitializer(BookRepo bookRepo, ObjectMapper objectMapper) {
        this.bookRepo = bookRepo;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    private void initializeLibrary() throws IOException {
        log.info("Reading book JSON data into the library!");

        BookData bookData = objectMapper.readValue(
                libraryResourceFile.getInputStream(),
                BookData.class
        );

        List<Book> books = bookData.books;

        bookRepo.saveAll(books);

        log.info("Successfully read JSON book data");
    }
}
