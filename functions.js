function homePage() {
  let container = document.querySelector(".container");

 
  container.innerHTML = `
    <head>
	<title>Students</title>
	<link href="../public/stylesheets/style.css" rel="stylesheet">
    </head>
    <body>
	<h1>Students</h1>
	<p><a class="button" >Create New Student</a></p>
	
    <table>
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Age</th>
				<th>Adress</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody class="container-students">
        </tbody>
        </table>
    `;

  attachRows();

  let button = document.querySelector('.button');

  button.addEventListener('click',()=>{

	attachCreatePage();
  })


}

async function attachRows() {
	let studentService= new StudentService();
  let studentContainer = document.querySelector(".container-students");

  let text = "";

  let data = await studentService.getStudents();
  data.forEach((element) => {
    text += createRow(element);
  });

  studentContainer.innerHTML = text;


}

function createRow(student) {
  console.log(student);
  return `
            <tr>
				<td>${student.firstName}</td>
				<td>${student.lastName}</td>
				<td>${student.age}</td>
				<td>${student.adress}</td>
				<td>${student.email}</td>
			</tr>`;
}

function attachCreatePage(){

	let body = document.querySelector('body');

	body.innerHTML = `
	<h1>New Student</h1>
    <form>
        <p>
            <label for="first-name">First Name</label>
            <input name="first-name" type="text" id="first-name">
        </p>
        <p>
            <label for="last-name">Last Name</label>
            <input name="last-name" type="text" id="last-name">
        </p>
        <p>
            <label for="age">Age</label>
            <input name="age" type="text" id="age">
        </p>
        <p>
            <label for="adress">Adress</label>
            <input name="adress" type="text" id="adress">
        </p>
		<p>
            <label for="email">Email</label>
            <input name="email" type="text" id="email">
        </p>
        <p>
            <input type="submit" class="create-student" value="Create New Student">
        </p>
        <p>
            <a class="button">Cancel</a>
        </p>
    </form>
	`;

	let createStudent = document.querySelector('.create-student');

	let studentService= new StudentService();
	createStudent.addEventListener('click',()=>{
	
		let inptFirstName = document.querySelector('#first-name');
		let inptLastName = document.querySelector('#last-name');
		let inptAge = document.querySelector('#age')
		let inptAdress = document.querySelector('#adress');
		let inptEmail = document.querySelector('#email');

		let newStudent = {firstName:inptFirstName.value,lastName:inptLastName.value,age:inptAge.value,adress:inptAdress.value,email:inptEmail.value}

		studentService.addStudent(newStudent);

		homePage();




	})

	
}


