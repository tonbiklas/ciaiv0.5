package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.Notification;
import pt.unl.fct.iadi.main.services.NotificationServiceImpl;


@RestController
@RequestMapping(value="/notifications")
public class NotificationController {

	@Autowired
	NotificationServiceImpl notifications;
	
	 @CrossOrigin(origins = "http://localhost:3000")
	 @RequestMapping(value="", method= RequestMethod.GET)
	    Notification[] getAll() {
	                return notifications.findAll();
	    }

	 @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="", method = RequestMethod.POST)
	    void createNotification(@RequestBody Notification t) {
	        notifications.create(t);
	    }

	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{id}", method = RequestMethod.GET)
	    Notification showNotification(@PathVariable int id) {
	        Notification t = notifications.findById(id);
	        Preconditions.checkFound(t);
	        return t;
	    }

	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
	    void updateNotification(@PathVariable int id, @RequestBody Notification t) {
	    	Notification t2 = notifications.findById(id);
	    	Preconditions.checkFound(t2);
	        
	        notifications.update(t);
	    }
	
	    
	     @CrossOrigin(origins = "http://localhost:3000")
		 @RequestMapping(value="/userNot/{username}/", method= RequestMethod.GET)
		    Notification[] getUserNotifications(@PathVariable String username) {
	    	return notifications.findByUsername(username);
		    }
	    
	     
	     @CrossOrigin(origins = "http://localhost:3000")
		 @RequestMapping(value="/answerbid/{bidTo}/{bidfrom}/{answer}/{id}/", method= RequestMethod.POST)
		    void answerBid(@PathVariable String bidTo, @PathVariable String bidfrom, @PathVariable String answer, @PathVariable int id) {
	        notifications.answerBid(bidTo, bidfrom, answer, id);
		    }
	     
	     @CrossOrigin(origins = "http://localhost:3000")
		 @RequestMapping(value="/confirmTrans/{id}/", method= RequestMethod.POST)
		    String confirmTrans(@PathVariable int id) {
	        return notifications.confirmTrans(id);
		    }
	     
	     @CrossOrigin(origins = "http://localhost:3000")
		 @RequestMapping(value="/notiowner/{id}/{answer}/", method= RequestMethod.POST)
		    String notiOwner(@PathVariable int id, @PathVariable String answer) {
	        return notifications.notiOwner(id, answer);
		    }
	     
	     
	     
	     
}
