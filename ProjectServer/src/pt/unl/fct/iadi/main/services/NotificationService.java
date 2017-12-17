package pt.unl.fct.iadi.main.services;

import pt.unl.fct.iadi.main.model.Notification;

public interface NotificationService {

	Notification[] findAll();

    void create(Notification t);

    void update(Notification t);
    
    Notification findById(int id);
}
