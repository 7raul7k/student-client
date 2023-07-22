
let base="http://localhost:8080/api/v1";

 class StudentService {

    api(path, method = "GET", body = null) {

        const url = base + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options)
    }


    async getStudents() {
        try {
            let data = await this.api('/all')

            if (data.status === 200) {
                let resp = await data.json();
                return resp;
            } else {
                let resp = await data.json();
            
            }

        } catch (error) {
           console.log(error);
        }
    }



    async updateStudent(student) {
        try {

            let data = await this.api(`/update`, "PUT", student);

            if (data.status === 202) {
                let resp = await data.json();

                message.success(resp, [3], console.log(""))
                return resp;
            } else {
                let resp = await data.json();

                message.error(resp.error.message, [3], console.log(""))
            }



        } catch (error) {
            message.error(error, [3], console.log(error))
        }
    }


    
    

    async addStudent(student) {

        try {

            let data = await this.api("/add", "POST", student)


            if (data.status === 204) {
                let resp = await data.json();
                console.log(resp);

            } else {
                let resp = await data.json();

                message.error(resp.error.message, [3], console.log(""))
            }


        } catch (error) {
            console.log(error)
        }

    }


    async deleteStudent(email) {

        try {

            let data = await this.api(`/delete/email=${email}`, "DELETE")


            if (data.status === 202) {
                let resp = await data.json();
                console.log(resp);
                message.success(resp, [3], console.log(""))

            } else {
                let resp = await data.json();

                message.error(resp.error.message, [3], console.log(""))
            }


        } catch (error) {
            message.error(error, [3], console.log(error))
        }

    }
}