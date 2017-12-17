package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;


import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.services.UserServiceImpl;

@RestController
@RequestMapping(value="/users")
public class UserController {

	@Autowired
	UserServiceImpl users;
	
	 @CrossOrigin(origins = "http://localhost:3000")
	 @RequestMapping(value="", method= RequestMethod.GET)
	    User[] getAll() {
	                return users.findAll();
	    }

	 @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createUser(@RequestBody User t) {
	        users.create(t);
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{username}/", method = RequestMethod.GET)
	    User showUsername(@PathVariable String username) {
	        User t = users.findByUsername(username);
	        Preconditions.checkFound(t);
	        return t;
	    }

	 @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{username}", method = RequestMethod.PUT)
	    void updateArtPiece(@PathVariable String username, @RequestBody User t) {
	    	User t2 = users.findByUsername(username);
	    	Preconditions.checkFound(t2);
	        
	        users.update(t);
	    }
	 
	 @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/emailExists/{email}/", method = RequestMethod.GET)
	    User emailExists(@PathVariable String email) {
	    	User t2 = users.findEmail(email);
	    	Preconditions.checkFound(t2);
	        return t2;
	    }
	    
	   @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/checkPassword/{username}/{password}/", method = RequestMethod.GET)
	    boolean passwordCheck(@PathVariable String username, @PathVariable String password) {
	    boolean check=false;	
		 User t2 = users.findByUsername(username);
	    	Preconditions.checkFound(t2);
	    	if(t2.getPassword().equals(password)) {
	    		check=true;
	    	}
	        return check;
	    }
	   
	   
	   //provavelmente sera necessario desativar a firewall e o antivirus de forma a não impedir o envio
	   //credenciais de quem envia tem de ser preenchidas no codigo
	   //se o email for da google ent e necessario deixar a aplicacao aceder a conta (aplicacoes n seguras)
	   @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/forgotPassword/{username}/", method = RequestMethod.POST)
	    void forgotPassword(@PathVariable String username) {
	    	User t2 = users.findByUsername(username);
	    
	    	Email email = new SimpleEmail();
			email.setHostName("smtp.gmail.com");
			email.setSmtpPort(587);
			email.setAuthenticator(new DefaultAuthenticator("rja.fernandes@campus.fct.unl.pt", "mT7ucqc3al"));
			email.setSSLOnConnect(true);
			email.setSubject("Password Recovery");
			try {
				email.setFrom("rja.fernandes@campus.fct.unl.pt");
				email.setMsg(t2.getPassword());
				email.addTo(t2.getEmail());
				email.send();
			} catch (EmailException e) {
				e.printStackTrace();
			}
	    }
	   
	   @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/isuseremail/{username}/{email}/", method = RequestMethod.GET)
	    boolean emailExists(@PathVariable String username, @PathVariable String email) {
	    	boolean verify=false;
		   User t2 = users.findByUsername(username);
	    	
	    	if(t2.getEmail().equals(email)) {
	    		verify=true;
	    	}
	    	Preconditions.checkFound(t2);
	        return verify;
	    }
	   
	   
}
