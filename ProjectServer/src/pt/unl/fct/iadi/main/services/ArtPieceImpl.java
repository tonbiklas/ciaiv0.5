package pt.unl.fct.iadi.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.unl.fct.iadi.main.model.ArtPiece;
import pt.unl.fct.iadi.main.model.ArtPieceId;
import pt.unl.fct.iadi.main.model.ArtPieceRepository;

@Service
public class ArtPieceImpl implements ArtPieceService{

	@Autowired
	ArtPieceRepository repository;
	
	@Override
	public ArtPiece[] findAll() {
		List<ArtPiece> l = new ArrayList<ArtPiece>();
		for(ArtPiece t: repository.findAll()) {
			l.add(t);
		}
		return l.toArray(new ArtPiece[l.size()]);
	}

	@Override
	public void create(ArtPiece t) {
		repository.save(t);
	}

	@Override
	public void update(ArtPiece t) {
		ArtPiece searched = repository.findById(t.getId());
		if(searched!=null) {
			searched.setArtMultimedia(t.getArtMultimedia());
			searched.setAvailableToSell(t.getAvailableToSell());
			searched.setPrice(t.getPrice());
			searched.setDate(t.getDate());
			searched.setDescription(t.getDescription());
			searched.setKeywords(t.getKeywords());
			searched.setOwner(t.getOwner());
			repository.save(searched);
		}	
	}

	@Override
	public ArtPiece findById(ArtPieceId id) {
	return repository.findById(id);
	}

	@Override
	public ArtPiece[] findByAuthor(String author) {
		List<ArtPiece> temp = new ArrayList<ArtPiece>();
		for(ArtPiece t: repository.findAll()) {
			if(t.getId().getAuthorName().equals(author)) {
			temp.add(t);
			}
		}
		return temp.toArray(new ArtPiece[temp.size()]);
	}

	@Override
	public ArtPiece[] findByKeyword(String keyword) {
		List<ArtPiece> temp = new ArrayList<ArtPiece>();
		for(ArtPiece t: repository.findAll()) {
			for(String key: t.getKeywords()) {
				if(key.equals(keyword)) {
					temp.add(t);
					break;
				}
			}
		}
		return temp.toArray(new ArtPiece[temp.size()]);
	}

}
