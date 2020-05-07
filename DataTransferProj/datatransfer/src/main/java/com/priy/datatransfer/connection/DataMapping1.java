package com.priy.datatransfer.connection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import com.datastax.spark.connector.japi.CassandraJavaUtil;
import com.priy.datatransfer.model.postgres.Account;
import com.priy.datatransfer.model.postgres.AccountDetail;
import com.priy.datatransfer.model.postgres.Employee;
import com.priy.datatransfer.model.postgres.EmployeeDetail;
import com.priy.datatransfer.model.postgres.EmployeeEntity;

public class DataMapping1 {

	public static void main(String[] args) {
		SparkConf conf = new SparkConf();
		conf.setAppName("Java Spark");
		conf.setMaster("local[*]");
		conf.set("spark.cassandra.connection.host", "127.0.0.1");

		SparkSession spark = SparkSession.builder().config(conf).getOrCreate();

		String query = " (select e1.*,a1.acc_number,a1.id as acnt_id,a1.employee_id  from employee e1 join account a1 on  e1.id=a1.employee_id) as a";


		String url = "jdbc:postgresql://localhost:5432/CustomerData";

		Dataset<Row> df = spark.read().format("jdbc").option("url", url).option("dbtable", query)
				.option("password", "postgres").option("user", "postgres").load();

		df.show();
		Dataset<EmployeeEntity> df1 = df.as(Encoders.bean(EmployeeEntity.class));
		List<EmployeeEntity> rowslist = df1.collectAsList();

		List<EmployeeDetail> list = new ArrayList<EmployeeDetail>();
		
		HashMap<Integer, List<EmployeeEntity>> hm = new HashMap<Integer, List<EmployeeEntity>>();
		for (EmployeeEntity emp : rowslist) {
			if (hm.get(emp.getId()) != null) {
				List<EmployeeEntity> ls = hm.get(emp.getId());
				ls.add(emp);
				hm.put(emp.getId(), ls);

			} else {
				List<EmployeeEntity> ls = new ArrayList<EmployeeEntity>();
				ls.add(emp);
				hm.put(emp.getId(), ls);

			}
		}
		for (Integer i : hm.keySet()) {
			List<EmployeeEntity> emps = hm.get(i);
			EmployeeDetail e1 = new EmployeeDetail();
			e1.setId(emps.get(0).getId());
			e1.setEmail(emps.get(0).getEmail());
			e1.setFirst_name(emps.get(0).getFirst_name());
			e1.setLast_name(emps.get(0).getLast_name());
			
			List<AccountDetail> acntList = new ArrayList<AccountDetail>();

			emps.forEach(e -> {
				AccountDetail ac = new AccountDetail();
				ac.setAcnt_id(e.getAcnt_id());
				ac.setAcc_number(e.getAcc_number());
				ac.setEmployee_id(e.getEmployee_id());
				
				acntList.add(ac);
			});
			
			e1.setAccounts(acntList);


			list.add(e1);
		}


		JavaSparkContext javaSparkContext = new JavaSparkContext(spark.sparkContext());

		JavaRDD<EmployeeDetail> userRDD = javaSparkContext.parallelize(list);

		CassandraJavaUtil.javaFunctions(userRDD)
				.writerBuilder("demo", "employeedetail", CassandraJavaUtil.mapToRow(EmployeeDetail.class)).saveToCassandra();
		javaSparkContext.close();

	}

}
