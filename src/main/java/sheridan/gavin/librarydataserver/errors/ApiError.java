package sheridan.gavin.librarydataserver.errors;

public record ApiError(
        int status,
        String error,
        String message
){}
