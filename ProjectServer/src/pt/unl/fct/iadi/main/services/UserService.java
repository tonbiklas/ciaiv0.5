package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.User;

public interface UserService {

	   User[] findAll();

	    void create(User t);

	    void update(User t);
	    
	    User findByUsername(String username);

		User findEmail(String email);
	    
}
