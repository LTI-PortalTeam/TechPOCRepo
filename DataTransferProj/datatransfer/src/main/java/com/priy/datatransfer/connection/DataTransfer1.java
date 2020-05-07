package com.priy.datatransfer.connection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.SparkSession;

import com.datastax.spark.connector.japi.CassandraJavaUtil;
import com.priy.datatransfer.model.postgres.Account;
import com.priy.datatransfer.model.postgres.Employee;
import com.priy.datatransfer.model.postgres.EmployeeEntity;

public class DataTransfer1 {

	public static void main(String[] args) {

		SparkConf conf = new SparkConf();
		conf.setAppName("Java Spark");
		conf.setMaster("local[*]");
		conf.set("spark.cassandra.connection.host", "127.0.0.1");

		SparkSession spark = SparkSession.builder().config(conf).getOrCreate();
		
		
		
		String query = "(SELECT * FROM employee) as e1";
				//" (select e1.*,a1.acc_number from employee e1 join account a1 on  e1.id=a1.employee_id) as a";
		 

		String url = "jdbc:postgresql://localhost:5432/CustomerData";

		Dataset<Row> df = spark.read().format("jdbc").option("url", url).option("dbtable", query)
				.option("password", "postgres").option("user", "postgres").load();

		df.show();
		
		Dataset<Employee> df1 = df.as(Encoders.bean(Employee.class));
		List<Employee> rowslist = df1.collectAsList();
		JavaSparkContext javaSparkContext = new JavaSparkContext(spark.sparkContext());

		JavaRDD<Employee> empRDD = javaSparkContext.parallelize(rowslist);

		CassandraJavaUtil.javaFunctions(empRDD).writerBuilder("demo", "employee", CassandraJavaUtil.mapToRow(Employee.class)).saveToCassandra();

		
		javaSparkContext.close();
		spark.close();

	}

}
