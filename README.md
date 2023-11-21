# group-project
Student management system

Group : 53
QiuYingci(12823241)’
Ye Yujiao(12803346)

Application link: https://abcde-nz6d.onrender.com

********************************************
# Login
userId and password:
  { id: '123', password: '123'}
  { id: '456', password: '456'}
  { id: '789', password: '789'}

Users can access to the student information platform by entering their id and password to operate. When the system shows that the input is correct, the login page will automatically go to the home page. If incorrect, users will try again to enter.

********************************************
# Logout
The home page includes a logout button that can be clicked to return to the login page.

********************************************
# CRUD service
·Create
  Create Student Information：
   1.StudentId
   2.StudentName
   3.AverageMark
   4.StudentGrade
   5.Gender
All information is required, no one can do without it.
All the student information created is visible on mongodb, the system displays 'create success' when the creation is complete and user can click the button to home page.
·Search
  User can find all student information by entering student id, if the id is correct, the system will display the information, if it is incorrect, it will not be displayed.
·Update
Update Student Information：
   1.StudentId
   2.StudentName
   3.AverageMark
   4.StudentGrade
   5.Gender
User can update all student information by entering student id, but all information must be filled out. The system displays 'update success' when the creation is complete and user can click the button to home page.
·Delete
User can delete all information about a student by entering student id.

********************************************

# Restful
In this project, there are three HTTP request types : post, get.
For all restful CRUD services, login should be done at first.
- Post 
        Post request is used for insert.
        Test:
        1.POST /login :curl -X POST -d "userId=123&password=123" http://localhost:8899/login
        2. POST /search :curl -X POST -d "student_id=123" http://localhost:8899/search
        3. POST /create :curl -X POST -d "student_id=123&student_name=John&student_grade=10&average_mark=90&gender=Male" http://localhost:8899/create
        4. POST /delete :curl -X POST -d "student_id=123" http://localhost:8899/delete
        5. POST /update :curl -X POST -d "student_id=123&student_name=John&student_grade=11&average_mark=95&gender=Male" http://localhost:8899/update

- Get
	Get request is used for find.
	Test: 
      1.GET /home :curl http://localhost:8899/home
      2.GET /login :curl http://localhost:8899/login
      3.GET /search :curl http://localhost:8899/search
      4.GET /create :curl http://localhost:8899/create
      5.GET /delete :curl http://localhost:8899/delete
      6. GET /update : curl http://localhost:8899/update
      7. GET /logout :curl http://localhost:8899/logout

