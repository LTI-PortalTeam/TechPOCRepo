<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h1>Students List</h1>
	<table border="2" width="70%" cellpadding="2">
	<tr><th>Student ID</th><th>Name of Student</th><th>Subjects</th><th>Add Marks</th></tr>
    <c:forEach var="student" items="${list}"> 
    <tr>
     <td>${student.student_Id}</td>
     <td>${student.name}</td>
    <td>${student.age}</td>
    
    <td><a href="addmarks/${student.student_Id}">Add Marks</a></td>
    </tr>
    </c:forEach>
    </table>
    <br/>
  <!--   <a href="addmarks">Add Marks</a> -->

</body>
</html>