package sheridan.gavin.librarydataserver.control;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    // Has extra mapping value (/api/books/**id here**)
    @GetMapping(value="/{id}", produces = "application/json")
    // The @PathVariable gets the /{id} part (as opposed to @RequestParam with ?id=)
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        return bookRepo.findById(id).map(ResponseEntity::ok)
                .orElseThrow(() -> new IllegalArgumentException("City with id '" + id + "' not found"));
    }
}
