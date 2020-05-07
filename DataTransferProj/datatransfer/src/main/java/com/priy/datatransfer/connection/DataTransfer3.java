package com.priy.datatransfer.connection;

import static com.datastax.spark.connector.japi.CassandraJavaUtil.javaFunctions;
import static com.datastax.spark.connector.japi.CassandraJavaUtil.mapRowTo;

import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.Optional;
import org.apache.spark.api.java.function.Function;

import com.priy.datatransfer.model.postgres.Account;
import com.priy.datatransfer.model.postgres.Employee;


import scala.Tuple2;

public class DataTransfer3 {
	
	private static void showResults(JavaSparkContext sc) {
//		JavaRDD<Employee> empRdd1 = javaFunctions(sc).cassandraTable("demo", "employee", mapRowTo(Employee.class));
//	    List<Employee>  empList =  empRdd1.collect();      
	   
		
		JavaPairRDD<Integer, Employee> empRdd = javaFunctions(sc)
	            .cassandraTable("demo", "employee", mapRowTo(Employee.class))
	            .keyBy(new Function<Employee, Integer>() {
	                @Override
	                public Integer call(Employee emp) throws Exception {
	                    return emp.getId();
	                }
	    });
		
		JavaPairRDD<Integer, Account> accntRdd = javaFunctions(sc)
	            .cassandraTable("demo", "account", mapRowTo(Account.class))
	            .keyBy(new Function<Account, Integer>() {
	                @Override
	                public Integer call(Account acc) throws Exception {
	                    return acc.getEmployee_id();
	                }
	    });
		
		 List<Tuple2<Employee, Optional<Account>>> results = empRdd.leftOuterJoin(accntRdd).values().collect();
		 
		 for (Tuple2<Employee, Optional<Account>> result : results) {
		        System.out.println(result);
		  }

	}

	public static void main(String[] args) {
	    SparkConf conf = new SparkConf();
	    conf.setAppName("Java API demo");
	    conf.setMaster("local[*]");
	    conf.set("spark.cassandra.connection.host", "127.0.0.1");
	    JavaSparkContext sc = new JavaSparkContext(conf);
	    showResults(sc);
	    sc.stop();

	}

}
