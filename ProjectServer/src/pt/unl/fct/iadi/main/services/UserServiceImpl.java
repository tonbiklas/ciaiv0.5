package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.User;
import pt.unl.fct.iadi.main.model.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository repository;
	
	@Override
	public User[] findAll() {
		List<User> l = new ArrayList<User>();
		for(User u: repository.findAll()) {
			l.add(u);
		}
		return l.toArray(new User[l.size()]);
	}

	@Override
	public void create(User t) {
		repository.save(t);
	}

	@Override
	public void update(User t) {
		User searched = repository.findByUsername(t.getUsername());
		if(searched!=null) {
			searched.setEmail(t.getEmail());
			searched.setPassword(t.getPassword());
			searched.setUsername(t.getUsername());
			searched.setUserType(t.getUserType());
			repository.save(searched);
		}	
		
	}

	@Override
	public User findByUsername(String username) {
		return repository.findByUsername(username);
	}

	@Override
	public User findEmail(String email) {
		return repository.findByEmail(email);
	}

}
