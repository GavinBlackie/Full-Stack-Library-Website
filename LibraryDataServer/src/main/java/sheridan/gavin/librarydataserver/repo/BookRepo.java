package sheridan.gavin.librarydataserver.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import sheridan.gavin.librarydataserver.domain.Book;

public interface BookRepo extends JpaRepository<Book, String> {
}
