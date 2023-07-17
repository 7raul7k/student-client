

let base="http://localhost:8080/api/v1";





async function  getAllStudents(){

let response = await fetch(base+"/all");


let data= await response.json();


return data;


}