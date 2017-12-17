package pt.unl.fct.iadi.main.services;
import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtPieceId;

public interface ArtPieceService {

	    ArtPiece[] findAll();

	    void create(ArtPiece t);

	    void update(ArtPiece t);
	    
	    ArtPiece findById(ArtPieceId id);

		ArtPiece[] findByAuthor(String author);

		ArtPiece[] findByKeyword(String keyword);
	
}
