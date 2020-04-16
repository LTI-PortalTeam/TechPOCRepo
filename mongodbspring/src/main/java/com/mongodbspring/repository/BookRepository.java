package com.mongodbspring.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;

import com.mongodbspring.model.Book;
@Component
public interface BookRepository extends MongoRepository<Book, Integer>{
	@Query(value="{id:?0}")
	Book findBookById(int id);
	
	@Query("{writer : ?0, category : ?1}")
	List<Book> findBooksByWriterAndCategory(String writer,String category);
	
	@Query("{noOfPages: {$gt: ?0}}")
	List<Book> findBooksGtThanNoOfPages(int noOfPages);
	
	@Query("{writer: ?0, noOfPages: {$lt: ?1}}")
	List<Book> findBooksByWriterAndLtThanNoOfPages(String writer, int noOfPages);
	//db.book.find({$or:[{writer:"Mahesh"},{category:"Backend"}]});
	@Query("{$or:[{writer:?0},{category:?1}]}")
	List<Book> findBooksByWriterOrCategory(String writer, String category);
	
	@Query(value="{writer:?0,category:?1}",fields="{'title':1,'writer':1,'noOfPages':1}")
	List<Book> findBooksWithCertainFields(String writer, String category);
	//db.book.find({category:"Backend"}).count();
	@Query(value="{category:?0}",count=true)
	Integer findBookCountByCategory(String category);
	//db.book.find( { writer: { $exists: true } } )
	@Query(value = "{writer : ?0}", exists = true)
	Boolean isBooksAvailableByWriter(String writer);
	//db.book.find({writer:"Mahesh"}).sort({title:1});
	@Query(value = "{writer : ?0}", sort = "{title : 1}") //sorting order by title ascending 
	List<Book> findBooksByWriter(String writer);
	//db.book.find({writer:"Mahesh"}).sort({title:-1});
	@Query(value = "{category : ?0}", sort = "{title : -1}") //sorting order by title descending
	List<Book> findBooksByCategory(String category);	
	
	@Query(value = "{category : ?0}", delete = true)
	Long deleteBooksByCategory(String category);	

}
