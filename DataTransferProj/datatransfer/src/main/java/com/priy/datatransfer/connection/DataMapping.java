package com.priy.datatransfer.connection;

import java.util.ArrayList;
import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import com.datastax.spark.connector.japi.CassandraJavaUtil;
import com.priy.datatransfer.model.postgres.Address;
import com.priy.datatransfer.model.postgres.Employee;
import com.priy.datatransfer.model.postgres.User;

public class DataMapping {

	public static void main(String[] args) {
		SparkConf conf = new SparkConf();
		conf.setAppName("Java Spark");
		conf.setMaster("local[*]");
		conf.set("spark.cassandra.connection.host", "127.0.0.1");

		SparkSession spark = SparkSession.builder().config(conf).getOrCreate();
		
		List<User> uList = new ArrayList<User>();
		
		User u1 = new User();
		
		List<Address> aList = new ArrayList<Address>();
		Address a1 = new Address();
		a1.setCity("siwan");
		a1.setStreet("bihar");
		a1.setZipcode("841226");
		
		Address a2 = new Address();
		a2.setCity("delhi");
		a2.setStreet("vaishali");
		a2.setZipcode("110089");
		
		aList.add(a1);
		aList.add(a2);
		
		u1.setUser_id(1);
		u1.setAddress(aList);
		
		uList.add(u1);
		
		
		JavaSparkContext javaSparkContext = new JavaSparkContext(spark.sparkContext());

		JavaRDD<User> empRDD = javaSparkContext.parallelize(uList);

		CassandraJavaUtil.javaFunctions(empRDD).writerBuilder("demo", "user", CassandraJavaUtil.mapToRow(User.class)).saveToCassandra();

		
		javaSparkContext.close();
		spark.close();

	}

}
