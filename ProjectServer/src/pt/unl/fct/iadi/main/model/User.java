package pt.unl.fct.iadi.main.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

	@Id
	String username;
	String password;
	String email;
	String type;
	
	public User() {}
	
	public User(String username, String password, String email, String type) {
		this.username=username;
		this.password=password;
		this.email=email;
		this.type=type;
	}
	
	public String getUsername() {
		return username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getUserType() {
		return type;
	}
	
	public void setUsername(String username) {
		this.username=username;
	}
	
	public void setPassword(String password) {
		this.password=password;
	}
	
	public void setEmail(String email) {
		this.email=email;
	}
	
	public void setUserType(String userType) {
		this.type=userType;
	}
	
}
