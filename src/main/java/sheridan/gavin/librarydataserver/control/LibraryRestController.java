package sheridan.gavin.librarydataserver.control;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;
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

    /* --- GET All Cities ---*/
    @GetMapping(produces = "application/json")
    @Operation(summary = "Retrieves all books", description = "Returns a list of all books")
    public List<Book> getAllBooks() {
        log.info("Fetching all books for a client.");
        return bookRepo.findAll();
    }

    /* --- Single GET City Request Handler --- */
    // Has extra mapping value (/api/books/**id here**)
    @GetMapping(value="/{id}", produces = "application/json")
    // The @PathVariable gets the /{id} part (as opposed to @RequestParam with ?id=)
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        return bookRepo.findById(id).map(ResponseEntity::ok)
                .orElseThrow(() -> new IllegalArgumentException("Book with id '" + id + "' not found"));
    }

    /*
       --- POST a single new City ---
     */
    @PostMapping(produces = "application/json")
    @Operation(summary = "POST a single new city", description = "POST mapping allowing for creation of a new book in the database. ")
    public Book postBook(@RequestBody @Valid Book book) {
        log.info("A new book has been POSTed to the database.");
        // TODO: add potential validation here
        return bookRepo.save(book); // Return the new saved book!
    }

    /*
      --- PUT: Edit a single City! ---
     */
    @PutMapping("/{searchId}")
    @Operation(summary = "PUT a city", description = "Edit a single book in the database. ")
    public Book putBook(@PathVariable String searchId, @RequestBody @Valid Book searchBook) throws NoResourceFoundException{

        // 1. Find the existing book in the database
        //    Throw an IllegalArgumentException if it cannot be found!!
        Book foundBook = bookRepo.findById( searchId )
                .orElseThrow( () -> new NoResourceFoundException(HttpMethod.GET, null, "Book with id " + searchId + " not found"));

        // 2. Edit the contents
        // (yes, this could use the .map with the previous step to shorten it, but this is more readable to me!)
        foundBook.setItemId(        searchId                    );
        foundBook.setIsbn(          searchBook.getIsbn()        );
        foundBook.setPageCount(     searchBook.getPageCount()   );
        foundBook.setAvailable(     searchBook.getAvailable()   );
        foundBook.setLateFeeUsd(    searchBook.getLateFeeUsd()  );

        // 3. Return the newly changed book
        bookRepo.save(foundBook);
        return foundBook;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) throws NoResourceFoundException {
        log.trace("Attempting to delete city with id: {}", id);

        // If that book exists, delete it and send a response!
        if (bookRepo.existsById(id)) {
            bookRepo.deleteById(id);

            return ResponseEntity.noContent().build();
        } else {
            throw new NoResourceFoundException(HttpMethod.GET, null, "/api/cities/" + id); // Else let the error handler do something!
        }
    }
}
