package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.Notification;
import pt.unl.fct.iadi.main.model.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService{

	
	@Autowired
	NotificationRepository repository;
	
	@Override
	public Notification[] findAll() {
		List<Notification> l = new ArrayList<Notification>();
		for(Notification t: repository.findAll()) {
			l.add(t);
		}
		return l.toArray(new Notification[l.size()]);
	}

	@Override
	public void create(Notification t) {
		repository.save(t);
	}

	@Override
	public void update(Notification t) {
		Notification searched = repository.findById(t.getId());
		if(searched!=null) {
		    searched.setAnswer(t.getAnswer());
		    searched.setBid(t.getBid());
		    searched.setBidFrom(t.getBidFrom());
		    searched.setClosedNot(t.getClosedNot());
		    searched.setPieceOwner(t.getPieceOwner());
		    searched.setShowOwner(t.getShowOwner());
		    searched.setType(t.getType());
		    searched.setCheckNot(t.getCheckNot());
		    searched.setPieceName(t.getPieceName());
		    searched.setTo(t.getTo());
			repository.save(searched);
		}
		
	}

	@Override
	public Notification findById(int id) {
		return repository.findById(id);
	}

	public Notification[] findByUsername(String username) {
		List<Notification> l = new ArrayList<Notification>();
		for(Notification t: repository.findAll()) {
			if(t.getTo().equals(username)) {
			l.add(t);
			}
		}
		return l.toArray(new Notification[l.size()]);
	}

	public void answerBid(String bidTo, String bidfrom, String answer, int id) {
		
		Notification toAnswer = repository.findById(id);
		toAnswer.setAnswer(answer);
		toAnswer.setClosedNot(true);
		
		Notification informUser = new Notification();
		informUser.setPieceName(toAnswer.getPieceName());
		informUser.setBid(toAnswer.getBid());
		informUser.setBidFrom(bidTo);
		informUser.setTo(bidfrom);
		informUser.setShowOwner(false);
		informUser.setPieceOwner(toAnswer.getPieceOwner());
		informUser.setType("AnswerBid"); 
		informUser.setClosedNot(false);
		informUser.setAnswer(answer);
		informUser.setCheckNot(0); 
		
		Notification confirmTrans = new Notification();
		confirmTrans.setPieceName(toAnswer.getPieceName());
		confirmTrans.setBid(toAnswer.getBid());
		confirmTrans.setBidFrom(bidfrom);
		confirmTrans.setTo(bidTo);
		confirmTrans.setShowOwner(false);
		confirmTrans.setPieceOwner(toAnswer.getPieceOwner());
		confirmTrans.setType("Confirm"); 
		confirmTrans.setClosedNot(false);
		confirmTrans.setAnswer(answer);
		confirmTrans.setCheckNot(informUser.getId());
		
		informUser.setCheckNot(confirmTrans.getId());
				
		repository.save(toAnswer);
		repository.save(informUser);
		repository.save(confirmTrans);
		
		informUser.setCheckNot(confirmTrans.getId());
		confirmTrans.setCheckNot(informUser.getId());
		repository.save(informUser);
		repository.save(confirmTrans);
		
		
	}

	public String confirmTrans(int id) {
		String verify="";
		
		Notification searched=repository.findById(id);
		
		searched.setAnswer("yes");
		searched.setClosedNot(true);
		
		repository.save(searched);
		
		if(repository.findById(searched.getCheckNot()).getClosedNot()) {
			if(repository.findById(searched.getCheckNot()).getShowOwner()) {
				verify="changeOwner";
			}
			else {
				verify="notToSale";
			}
		}
		
	return verify;}

	public String notiOwner(int id, String answer) {
		String verify="";
		
		Notification searched=repository.findById(id);
		if(answer.equals("yes")) {
			searched.setShowOwner(true);
		}
		
		int idToCheck = searched.getCheckNot();
		searched.setClosedNot(true);
		repository.save(searched);
		
		Notification searched2 = repository.findById(idToCheck);
		if(searched2.getAnswer().equals("yes")) {
			if(answer.equals("yes")) {
			verify="changeOwner";
			}
			else {
				verify="notToSale";
			}
			}
		
		
	return verify;}

}
