package pt.unl.fct.iadi.main.model;

import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<Notification,Integer>{
	
	Notification findById(int id);

}
