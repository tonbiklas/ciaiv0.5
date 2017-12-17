package pt.unl.fct.iadi.main.model;



import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

@Entity
public class ArtPiece {

	@EmbeddedId
	ArtPieceId id;
	String owner;
	String description;
	double price;
	String[] artMultimedia;
	String availableToSell;
	String[] keywords;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	Date date;
	
	public ArtPiece() {}
	
	public ArtPiece(String owner, String description, double bidValue, String[] artURL, String availableToSell, String pieceName, String[] keywords, Date creationDate, ArtPieceId id) {
		this.id=id;
		this.owner= owner;
		this.description=description;
		this.price=bidValue;
		this.artMultimedia=artURL;
		this.availableToSell=availableToSell;
		this.keywords=keywords;
		this.date=creationDate;
	}
	
	
	public ArtPieceId getId() {
		return id;
	}
	
	public String getOwner() {
		return owner;
	}
	
	public String getDescription() {
		return description;
	}
	
	public double getPrice() {
		return price;
	}
	
	public String[] getArtMultimedia() {
		return artMultimedia;
	}
	
	public String getAvailableToSell() {
		return availableToSell;
	}
	
	public String[] getKeywords() {
		return keywords;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setID(ArtPieceId id) {
	this.id=id;	
	}
	
	public void setOwner(String owner) {
		this.owner=owner;
	}
	
	public void setDescription(String description) {
		this.description=description;
	}
	
	public void setPrice(double bid) {
		this.price=bid;
	}
	
	public void setArtMultimedia(String[] artURL) {
		this.artMultimedia=artURL;
	}
	
	public void setAvailableToSell(String available) {
		this.availableToSell=available;
	}
	
	public void setKeywords(String[] keywords) {
		this.keywords=keywords;
	}
	
	public void setDate(Date creationDate) {
		this.date=creationDate;
	}
	
	
	
}
