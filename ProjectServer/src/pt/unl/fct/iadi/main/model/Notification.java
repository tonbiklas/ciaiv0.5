package pt.unl.fct.iadi.main.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Notification {

	double bid;
	String to;
	String bidFrom;
	boolean showOwner;
	String pieceOwner;
	String type;
	boolean closedNot;
	String answer;
	String pieceName;
	int checkNot;
	@GeneratedValue
	@Id
	int id;
	
	public Notification() {}
	
	public Notification(int id, String to, String pieceName,double bid, String bidFrom, boolean showOwner, String pieceOwner, String type, boolean closedNot, String answer, int checkNot) {
		this.id=id;
		this.bid=bid;
		this.to=to;
		this.bidFrom=bidFrom;
		this.showOwner=showOwner;
		this.pieceOwner=pieceOwner;
		this.type=type;
		this.closedNot=closedNot;
		this.answer=answer;
		this.pieceName=pieceName;
		this.checkNot=checkNot;
	}
	
	public double getBid() {
		return bid;
	}
	
	public String getPieceName() {
		return pieceName;
	}
	
	public String getBidFrom() {
		return bidFrom;
	}
	
	public String getTo() {
		return to;
	}
	
	public boolean getShowOwner() {
		return showOwner;
	}
	
	public String getPieceOwner() {
		return pieceOwner;
	}
	
	public String getType() {
		return type;
	}
	
	public boolean getClosedNot() {
		return closedNot;
	}
	
	public String getAnswer() {
		return answer;
	}
	
	public int getCheckNot() {
		return checkNot;
	}
	
	public int getId() {
		return id;
	}
	
	public void setBid(double value) {
		this.bid=value;
	}
	
	public void setPieceName(String name) {
		this.pieceName=name;
	}
	
	public void setTo(String username) {
		this.to=username;
	}
	
	public void setBidFrom(String from) {
		this.bidFrom=from;
	}
	
	public void setShowOwner(boolean show) {
		this.showOwner=show;
	}
	
	public void setPieceOwner(String owner) {
		this.pieceOwner=owner;
	}
	
	public void setType(String type) {
		this.type=type;
	}
	
	public void setClosedNot(boolean closed) {
		this.closedNot=closed;
	}
	
	public void setAnswer(String answer) {
		this.answer=answer;
	}
	
	public void setCheckNot(int check) {
		this.checkNot=check;
	}
	
}
