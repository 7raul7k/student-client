function homePage() {
  let container = document.querySelector(".container");

  container.innerHTML = `
  
	<h1>Students</h1>
	<p><a class="button btn-new" >Create New Student</a></p>
	
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

  let button = document.querySelector(".btn-new");

  button.addEventListener("click", () => {
    attachCreatePage();
  });

  let studentContainer = document.querySelector(".container-students");

  studentContainer.addEventListener("click", async (e) => {
    let target = e.target;

    console.log(target);

    if (target.classList.contains("first-name")) {
      let studentRow = target.parentNode;
      let studentService = new StudentService();

      let studentSelected = {
        firstName: studentRow.querySelector(".first-name").textContent,
        lastName: studentRow.querySelector(".last-name").textContent,
        age: studentRow.querySelector(".age").textContent,
        adress: studentRow.querySelector(".adress").textContent,
        email: studentRow.querySelector(".email").textContent,
      };

      attachUpdatePage(studentSelected);
    }
  });
}

async function attachRows() {
  let studentService = new StudentService();
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

function attachCreatePage() {
  let container = document.querySelector(".container");

  container.innerHTML = `
	<h1>New Student</h1>
    <div>
        <p>
            <label for="first-name">First Name</label>
            <input name="first-name" type="text" id="first-name">
            <div class="firstName-error"></div>
        </p>
        <p>
            <label for="last-name">Last Name</label>
            <input name="last-name" type="text" id="last-name">
            <div class="lastName-error"></div>
        </p>
        <p>
            <label for="age">Age</label>
            <input name="age" type="text" id="age">
            <div class="age-error"></div>
        </p>
        <p>
            <label for="adress">Adress</label>
            <input name="adress" type="text" id="adress">
            <div class="adress-error"></div>
        </p>
		<p>
            <label for="email">Email</label>
            <input name="email" type="text" id="email">
            <div class="email-error"></div>
        </p>
        <p>
            <button class="button button-create" >Create New Student</button>
        </p>
        <p>
            <button class="button button-cancel">Cancel</button>
        </p>
    </div>
	`;

  let createStudent = document.querySelector(".button-create");

  let inptFirstName = document.querySelector("#first-name");
  let inptLastName = document.querySelector("#last-name");
  let inptAge = document.querySelector("#age");
  let inptAdress = document.querySelector("#adress");
  let inptEmail = document.querySelector("#email");
  let studentService = new StudentService();
  createStudent.addEventListener("click", () => {
    let newStudent = {
      firstName: inptFirstName.value,
      lastName: inptLastName.value,
      age: inptAge.value,
      adress: inptAdress.value,
      email: inptEmail.value,
    };
    
    let errors = [];

    let properties = []
    if ( inptFirstName.value !== "" && inptLastName.value !== "" && inptAge.value !== "" && 
    inptAdress.value !== "" && inptEmail.value !== "") {
      
      studentService.addStudent(newStudent);
    } else {
      for (const property in newStudent) {
        if (newStudent[property] === "") {
        errors.push(`${property}`)
        }else{

          removeError(`${property}`)
        }
      }

      attachErrors(errors);

   
      
    }


    console.log("create");
  });

  let cancel = document.querySelector(".button-cancel");

  cancel.addEventListener("click", () => {
    homePage();
    console.log("cancel");
  });
}

function attachErrors(errors) {
  

     let text = "";


     errors.forEach(err=>{
      text = "";
      let error = document.querySelector(`.${err}-error`);
     if(err){
      text += `
          <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ${err}:missing
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
            
        `;

        
      
     }

     error.innerHTML = text;

    })
   

   

   
}

function removeError(error){

  

    let err = document.querySelector(`.${error}-error`);

    err.textContent = "";



}

async function attachUpdatePage(student) {
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
         <a class="button cancel-button" >Cancel</a>
     </p>
     <p><input class="delete-student" type="submit" value="Delete Student"></p>
 </form>`;

  let updateStudent = document.querySelector(".update-student");

  let studentService = new StudentService();

  updateStudent.addEventListener("click", (e) => {
    let inptFirstName = document.querySelector("#first-name");
    let inptLastName = document.querySelector("#last-name");
    let inptAge = document.querySelector("#age");
    let inptAdress = document.querySelector("#adress");
    let inptEmail = document.querySelector("#email");

    let newStudent = {
      firstName: inptFirstName.value,
      lastName: inptLastName.value,
      age: inptAge.value,
      adress: inptAdress.value,
      email: inptEmail.value,
    };

    studentService.updateStudent(newStudent);

    let deleteStudent = document.querySelector(".delete-student");
  });

  let deleteStudent = document.querySelector(".delete-student");

  deleteStudent.addEventListener("click", () => {
    studentService.deleteStudent(student.email);

    homePage();
  });

  let cancelButton = document.querySelector(".cancel-button");

  cancelButton.addEventListener("click", () => {
    homePage();
  });
}

function createToast(type, message) {
  let div = document.createElement("div");

  div.classList.add("toast");
  div.classList.add("align-items-center");
  div.role = "alert";
  div.ariaLive = "assertive";
  div.ariaAtomic = "true";

  div.innerHTML = `
  div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      ${message}
    </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
  
  `;

  return div;
}
