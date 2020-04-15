# SessionTrackDemoXml

Step 1: Clone or Download from https://github.com/priy04/SessionTrackDemoXml.
Step 2: Import it in eclipse or in any IDE.
Step 3: Build the project using maven clean install.
Step 4: Deploy the project on Tomcat/JBoss Server.
Step 5: The application has in memory users as (username - user1, password - user1),(username - user2, password - user2)
        (username - user3, password - user3)
Step 5: Open on Browser http://localhost:8080/SessionTrackDemoXml/login
Step 6: Enter Username and password
Step 7: If logged In user count is greater than 2, the user will be logged out and redirected to a Retry After SomeTime page.
        (http://localhost:8080/SessionTrackDemoXml/retry)
Step 8: Else user will be logged in and redirected to Welcome Page (http://localhost:8080/SessionTrackDemoXml/welcome)
Step 9: To get the Logged in users use the API ((http://localhost:8080/SessionTrackDemoXml/loggedUsers)
