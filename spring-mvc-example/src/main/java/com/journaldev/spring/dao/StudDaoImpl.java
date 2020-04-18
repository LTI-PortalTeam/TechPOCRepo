package com.journaldev.spring.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import com.journaldev.spring.beans.Student;
import com.journaldev.spring.beans.Subject;

public class StudDaoImpl {
	JdbcTemplate template;

	public void setTemplate(JdbcTemplate template) {
		this.template = template;
	}

	public int save(Student s) {
		String sql = "insert into Student(name,id,age) values('" + s.getName() + "'," + s.getStudent_Id() + ",'"+ s.getAge() + "')";
		return template.update(sql);
	}

	public Student getStudentById(int student_Id) {
		String sql = "select * from Student where id=?";
		return template.queryForObject(sql, new Object[] { student_Id },
				new BeanPropertyRowMapper<Student>(Student.class));
	}

	public List<Student> getStudents() {
		return template.query("select * from Student", new RowMapper<Student> (){
			public Student mapRow(ResultSet rs, int row) throws SQLException {
				Student st = new Student();
				st.setName(rs.getString(1));
				st.setStudent_Id(rs.getInt(2));
				st.setAge(rs.getInt(3));

				return st;
			}
		});
	}

	public int save(Subject sub) {
		String sql = "insert into Subject(sub_Name,sub_Id) values('" + sub.getSub_Name() + "'," + sub.getSub_Id() + "')";
		return template.update(sql);
	}

	public Subject getSubjectById(int sub_Id) {
		String sql = "select * from Student where id=?";
		return template.queryForObject(sql, new Object[] { sub_Id }, new BeanPropertyRowMapper<Subject>(Subject.class));
	}

	public List<Subject> getSubjects() {
		return template.query("select * from Subject", new RowMapper<Subject>() {
			public Subject mapRow(ResultSet rs, int row) throws SQLException {
				Subject sub = new Subject();
				sub.setSub_Name(rs.getString(1));
				sub.setSub_Id(rs.getInt(2));

				return sub;
			}
		});
	}

}
