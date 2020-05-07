package com.priy.datatransfer.connection;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class TestQueryJoin {

	public static void main(String[] args) {
		SparkConf conf = new SparkConf();
		conf.setAppName("Java Spark");
		conf.setMaster("local[*]");
		conf.set("keyspace", "demo");
		conf.set("spark.cassandra.connection.host", "127.0.0.1");

		SparkSession spark = SparkSession.builder().config(conf).getOrCreate();

		String query = " (select e1.*,a1.acc_number,a1.id as acnt_id,a1.employee_id  from employee e1 join account a1 on  e1.id=a1.employee_id) as a";

		Dataset<Row> employees = spark.sql("SELECT * FROM employee");
		employees.registerTempTable("employees");
		//DataFrame managers = spark.sql("SELECT name FROM employees WHERE role = 'Manager' ");
		
		employees.collect();
	}

}
