package pt.unl.fct.iadi.main.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ArtPieceRepository extends CrudRepository<ArtPiece,Integer>{

	ArtPiece findById(ArtPieceId id);
	
}
