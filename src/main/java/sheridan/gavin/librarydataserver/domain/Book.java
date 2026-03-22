package sheridan.gavin.librarydataserver.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.lang.String;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    private String itemId;

    private String isbn;
    private String bookTitle;
    private int pageCount;

    @JsonProperty(value="isAvailable")
    private boolean available;

    private double lateFeeUsd;
}
