package sheridan.gavin.librarydataserver.control;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sheridan.gavin.librarydataserver.domain.Book;
import sheridan.gavin.librarydataserver.repo.BookRepo;

import java.util.List;

@RestController // Specifies this controls REST API
@Slf4j
@RequestMapping(value = "/api/books", produces ="application/json")
public class LibraryRestController {

    private final BookRepo bookRepo;

    public LibraryRestController(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    @GetMapping(produces = "application/json")
    @Operation(summary = "Retrieves all books", description = "Returns a list of all books")
    public List<Book> getAllBooks() {
        log.info("Fetching all books for a client.");
        return bookRepo.findAll();
    }
}
