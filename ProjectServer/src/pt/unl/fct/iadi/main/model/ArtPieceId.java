package pt.unl.fct.iadi.main.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class ArtPieceId implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name;
	private String author;
	
	
	public ArtPieceId() {
		
	}
	
	public ArtPieceId(String pieceName, String author) {
		this.name=pieceName;
		this.author=author;
	}
	
	public String getPieceName() {
		return name;
	}
	
	public String getAuthorName() {
		return author;
	}
	
	  @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (!(o instanceof ArtPieceId)) return false;
	        ArtPieceId temp = (ArtPieceId) o;
	        return Objects.equals(getAuthorName(), temp.getAuthorName()) &&
	                Objects.equals(getPieceName(), temp.getPieceName());
	    }
	
	
	@Override
	public int hashCode() {
		return Objects.hash(getAuthorName(), getPieceName());
	}
	
}
