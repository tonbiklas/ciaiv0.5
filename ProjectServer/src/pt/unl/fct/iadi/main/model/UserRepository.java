package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,String>{

	User findByUsername(String username);
	
	User findByEmail(String email);
}
