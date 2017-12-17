package pt.unl.fct.iadi.main;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtPieceId;
import pt.unl.fct.iadi.main.model.ArtPieceRepository;
import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.model.UserRepository;
import pt.unl.fct.iadi.main.model.Notification;
import pt.unl.fct.iadi.main.model.NotificationRepository;

// Inspired in: https://spring.io/guides/gs/spring-boot/
// also in: https://spring.io/guides/gs/accessing-data-jpa/

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx, ArtPieceRepository pieces, UserRepository users, NotificationRepository notifications) {
        return args -> {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
            String[] array = new String[1];
            array[0]="key";
            String[] artMultimedia = new String[1];
            artMultimedia[0] = "https://images.fineartamerica.com/images-medium-large-5/abstract-art-original-landscape-painting-metallic-gold-textured-blue-moon-rising-by-madart-megan-duncanson.jpg";
            //artMultimedia[1] = "https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3";
            pieces.save(new ArtPiece("tonbiklas", "My first art work.", 20.2, artMultimedia, "Yes", "Painting", array, sdf.parse("2017-10-22"), new ArtPieceId("pieceName", "tonbiklas")));
            users.save(new User("tonbiklas","bicicleta","jml.santos@campus.fct.unl.pt","Artist"));
            users.save(new User("amida","jorjao","amida@email.com","User"));
            
        };
    }
}