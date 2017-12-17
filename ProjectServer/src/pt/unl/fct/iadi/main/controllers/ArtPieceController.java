package pt.unl.fct.iadi.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtPieceId;
import pt.unl.fct.iadi.main.services.ArtPieceService;


@RestController
@RequestMapping(value="/artpieces")
public class ArtPieceController {

	@Autowired
	ArtPieceService pieces;
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	 @RequestMapping(value="", method= RequestMethod.GET)
	    ArtPiece[] getAll() {
	                return pieces.findAll();
	    }

	   @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{pieceName}/{author}/", method = RequestMethod.POST)
	    void createArtPiece(@RequestBody ArtPiece t, @PathVariable String pieceName, @PathVariable String author) {
		   ArtPieceId id= new ArtPieceId(pieceName, author);
		   t.setID(id);
	        pieces.create(t);
	    }


	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{piece}/{author}/", method = RequestMethod.GET)
	    ArtPiece showPiece(@PathVariable String piece, @PathVariable String author) {
	        ArtPiece t = pieces.findById(new ArtPieceId(piece,author));
	        Preconditions.checkFound(t);
	        return t;
	    }

	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{piece}/{author}/", method = RequestMethod.PUT)
	    void updateArtPiece(@PathVariable String piece, @PathVariable String author, @RequestBody ArtPiece t) {
	    	ArtPiece t2 = pieces.findById(new ArtPieceId(piece,author));
	    	Preconditions.checkFound(t2);
	        
	        pieces.update(t);
	    }
	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/{author}/", method = RequestMethod.GET)
	    ArtPiece[] getArtPieceByAuthor(@PathVariable String author) {
	    	ArtPiece[] t2 = pieces.findByAuthor(author);
	    	Preconditions.checkFound(t2);
	        
	       return t2;
	    }
	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/keywords/{keyword}/", method = RequestMethod.GET)
	    ArtPiece[] getArtPieceByKeywrod(@PathVariable String keyword) {
	    	ArtPiece[] t2 = pieces.findByKeyword(keyword);
	    	Preconditions.checkFound(t2);
	        
	       return t2;
	    }
	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/changeOwner/{piece}/{author}/{owner}/", method = RequestMethod.POST)
	    void changeOwner(@PathVariable String piece, @PathVariable String author, @PathVariable String owner) {
	    	
	    	ArtPiece t2 = pieces.findById(new ArtPieceId(piece,author));
	    	t2.setOwner(owner);
	    	t2.setAvailableToSell("no");
	        
	        pieces.update(t2);
	    }
	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @RequestMapping(value="/notToSale/{piece}/{author}/", method = RequestMethod.POST)
	    void notToSale(@PathVariable String piece, @PathVariable String author) {
	    	
	    	ArtPiece t2 = pieces.findById(new ArtPieceId(piece,author));
	    	t2.setAvailableToSell("no");
	    	
	        pieces.update(t2);
	    }
	    
	    
	    
	}
