package tn.itbs.erp.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID= 1L;

    public ResourceNotFoundException(String message){
        super(message);

    }
    

@ExceptionHandler(Exception.class)
public ResponseEntity<String> handleException(Exception ex) {
    return new ResponseEntity<>("Erreur: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
}

}
