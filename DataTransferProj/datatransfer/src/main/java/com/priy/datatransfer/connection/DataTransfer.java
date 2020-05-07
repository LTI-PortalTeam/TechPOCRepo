package com.priy.datatransfer.connection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.ForeachFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.SparkSession;

import com.priy.datatransfer.model.postgres.Account;
import com.priy.datatransfer.model.postgres.Employee;
import com.priy.datatransfer.model.postgres.EmployeeEntity;

public class DataTransfer {

	public static void main(String[] args) {
		
//		try {
//		    Class.forName("org.postgresql.Driver");
//		    System.out.println("PostgreSQL JDBC Driver Registered!");
//		} catch (ClassNotFoundException e) {
//		    // TODO Auto-generated catch block
//		    e.printStackTrace();
//		}
//		Map<String, String> options = new HashMap<String, String>();
//	   // options.put("url", "jdbc:postgresql://localhost:5432/CustomerData");
//	   // options.put("dbtable", "test");
//	    options.put("user", "postgres");
//	    options.put("password", "postgres");
//	    options.put("driver", "org.postgresql.Driver");
//	    
//	    Properties connectionProperties = new Properties();
//		connectionProperties.setProperty("user", "postgres");
//		connectionProperties.setProperty("password", "postgres");
//		connectionProperties.setProperty("Driver", "org.postgresql.Driver");
	    
	    SparkConf conf= new SparkConf();
	    conf.setAppName("Java Spark");
	    conf.setMaster("local[*]");
	    conf.set("spark.cassandra.connection.host", "127.0.0.1");
	    SparkSession spark = SparkSession
	    		  .builder()
	    		  .config(conf)
	    		  .getOrCreate();
	    
	    String query =  "(SELECT * FROM employee) as e";
	    String query1 =  "(SELECT * FROM account) as a";
	  
	    String url = "jdbc:postgresql://localhost:5432/CustomerData";
	   
	    Dataset<Row> df = spark
        .read()
        .format( "jdbc" )
        .option( "url", url )
        .option( "dbtable", query )
        .option( "password", "postgres" )
        .option( "user", "postgres" )
        .load();
	    
	    df.show();
   
	   df.write().format("org.apache.spark.sql.cassandra").option("table", "employee").option("keyspace", "demo").save();
	   
	    Dataset<Row> df1 = spark
	            .read()
	            .format( "jdbc" )
	            .option( "url", url )
	            .option( "dbtable", query1 )
	            .option( "password", "postgres" )
	            .option( "user", "postgres" )
	            .load();
	    
	    df1.show();
	    
	   df1.write().format("org.apache.spark.sql.cassandra").option("table", "account").option("keyspace", "demo").save();


	}

}
