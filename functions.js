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

  let studentContainer = document.querySelector(".container-students");

  studentContainer.addEventListener("click",async (e)=>{

    let target = e.target;

    console.log(target);

    if(target.classList.contains("first-name")){
     
      let studentRow = target.parentNode;
      let studentService = new StudentService();
     
      let studentSelected = {
          firstName: studentRow.querySelector('.first-name').textContent,
          lastName: studentRow.querySelector('.last-name').textContent,
          age: studentRow.querySelector('.age').textContent,
          adress: studentRow.querySelector('.adress').textContent,
          email: studentRow.querySelector('.email').textContent,
      };

   

      


  
      attachUpdatePage(studentSelected);
  }
    
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

  return `
            <tr>
				<td class="first-name">${student.firstName}</td>
				<td class="last-name">${student.lastName}</td>
				<td class="age">${student.age}</td>
				<td class="adress">${student.adress}</td>
				<td class="email">${student.email}</td>
			</tr>`;
}

function attachCreatePage(){

	let body = document.querySelector('.container');

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
    event.preventDefault();
	
		let inptFirstName = document.querySelector('#first-name');
		let inptLastName = document.querySelector('#last-name');
		let inptAge = document.querySelector('#age')
		let inptAdress = document.querySelector('#adress');
		let inptEmail = document.querySelector('#email');

		let newStudent = {firstName:inptFirstName.value,lastName:inptLastName.value,age:inptAge.value,adress:inptAdress.value,email:inptEmail.value}

    let errors = [];
    if(inptFirstName.value !== "" && inptLastName.value !== "" && inptAge.value !== "" && inptAdress.value !== "" && inptEmail.value !== "" ){

      let isSuccess = studentService.addStudent(newStudent);

      if(isSuccess){
          homePage();
      }else{
        alert("Student exist !")
      }

    

    }else{
      for(const property in newStudent){

        if(newStudent[property] === ""){

        errors.push(`${property}:missing`);


      }
    
    }
    attachErrors(errors);
		



    }
	})

	
}

function attachErrors(errors){
  let containerErrors = document.querySelector(".container-errors");

  if (containerErrors) {
      let text =`<ul class="error">`
      errors.forEach(err=>{
          text +=`<li>${err}</li>`;
      });
      text +="</ul>";

      containerErrors.innerHTML = text;
  } 
}

function attachUpdatePage(student){

  let container = document.querySelector(".container");

 container.innerHTML = `
 <h1>Update Student</h1>
 <form>
     <p>
         <label for="first-name">First Name</label>
         <input name="first-name" type="text" id="first-name" value="${student.firstName}">
     </p>
     <p>
         <label for="last-name">Last Name</label>
         <input name="last-name" type="text" id="last-name" value="${student.lastName}">
     </p>
     <p>
         <label for="age">Age</label>
         <input name="age" type="text" id="age" value="${student.age}">
     </p>
     <p>
         <label for="adress">Adress</label>
         <input name="adress" type="text" id="adress" value="${student.adress}">
     </p>
     <p>
     <label for="email">Email</label>
     <input name="email" type="text" id="email" value="${student.email}">
     </p>
     <p>
         <input class="update-student" type="submit" value="Update Student">
     </p>
 </form>
 <form>
     <p>
         <a class="button" >Cancel</a>
     </p>
     <p><input class="delete-student" type="submit" value="Delete Student"></p>
 </form>`

 let updateStudent = document.querySelector(".update-student");

 let studentService= new StudentService();

 updateStudent.addEventListener("click",(e)=>{
  e.preventDefault();
  let inptFirstName = document.querySelector('#first-name');
  let inptLastName = document.querySelector('#last-name');
  let inptAge = document.querySelector('#age')
  let inptAdress = document.querySelector('#adress');
  let inptEmail = document.querySelector('#email');

  let newStudent = {
    id: student.id,  
    firstName: inptFirstName.value,
    lastName: inptLastName.value,
    age: inptAge.value,
    adress: inptAdress.value,
    email: inptEmail.value
  }

    studentService.updateStudent(newStudent);
    

    let deleteStudent  = document.querySelector(".delete-student");

    deleteStudent.addEventListener("click",(e)=>{
      e.preventDefault();
      studentService.deleteStudent(student.email.value);

      homePage();
    })
 

 })

 

  
}


