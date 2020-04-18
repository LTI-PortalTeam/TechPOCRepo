<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
   <form:form method="post" action="save">  
      	<table >  
         <tr>  
          <td>Name : </td> 
          <td><form:input path="Student ID"  /></td>
         </tr>  
         <tr>  
          <td>Salary :</td>  
          <td><form:input path="Name" /></td>
         </tr> 
         <tr>  
          <td>Designation :</td>  
          <td><form:input path="Subject" /></td>
         </tr> 
         <tr>  
          <td> </td>  
          <td><input type="submit" value="Save" /></td>  
         </tr>  
        </table>  
       </form:form>  


</body>
</html>