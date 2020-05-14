<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">Use the template to create an admission letter for Admitted Students</a>

                </div>
                </nav>

                <div class="row mt-4 ml-3 mr-3">
                <div class="col-sm-4">
                <div class="card shadow-lg">
                <div class="card-body text-center">
                    <h5 class="card-title">Enter relevant details below</h5>
                    <span class="alert" :class="[res === 'updated'? 'alert-success': 'alert-danger']" v-show="alert_show">{{alert}}</span>
                            <form>
                    <div class="form-group">
                    <input type="text" v-model="student_name" class="form-control form-control-lg mt-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Student name">
                    <span class="text-danger">{{error1}}</span>
                    </div>
                    <div class="form-group">
                    <input type="text"  v-model="title" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter title eg: Sir/Madam">
                    <span class="text-danger">{{error2}}</span>
                    </div>
                    <div class="form-group">
                    <input type="email" v-model="email" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter student email">
                    <span class="text-danger">{{error3}}</span>
                    </div>
                    <div class="form-group">
                    <input type="text" v-model="student_address" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Student Address">
                    <span class="text-danger">{{error4}}</span>
                    </div>
                    <div class="form-group">
                    <input type="text" v-model="program_name" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Program name">
                    <span class="text-danger">{{error5}}</span>
                    </div>
                    <div class="form-group">
                    <input type="text" v-model="student_number" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter student reference number">
                    <span class="text-danger">{{error6}}</span>
                    </div>
                    <div class="spinner-border text-info" role="status" v-show="loading">
                    <span class="sr-only">Loading...</span>
                    </div><br>
                    <button type="submit" class="btn btn-primary" @click.prevent="save">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="card shadow-lg">
                <div class="card-body" ref="admission_letter">
                        <h3 class="card-titile text-center mb-5">University Of Energy And Natural Resources</h3>
                        <h3 class="card-titile text-center mb-5">OFFICE OF THE REGISTRAR</h3>
                    <div class="row">
                        <div class="col-sm-6">
                            <b><p>{{student_name}}</p></b>
                            <b><p>{{student_number}}</p></b>
                            <b><p>{{email}}</p></b>
                            <b><p>{{student_address}}</p></b>
                        </div>
                        <div class="col-sm-6 mt-3 ml-1">
                            <p>P.O Box 214, Sunyani</p>
                            <p>Tel: (0) 352 192768</p>
                            <p>E-mail: registrar@uenr.edu.gh</p>
                            <p>Website: www.uenr.edu.gh</p>
                        </div>
                    </div>

                    <div class="card border-0">
                        <b class="text-center">OFFER OF ADMISSION</b>
                        <p>Dear {{title}},</p>
                        <span>
                           1. I write , with reference to your application, to offer you admission to this University to pursue a 4 year degree
                            programme leading to the award of <b>{{program_name}}</b>.
                        </span>
                        <span>
                            2. This is offer is based on the available information that you have satisfied the Entry Requirement for the above mentioned programme of study.
                        </span>
                        <span>
                            3. should the information you have provided be found at any time to be false or should you be found to be deficient
                            in the entry requirement in the course of your study, you will be dimissed by the University.
                        </span>
                        <span>
                            4. Your admission is also subject to your being certified medically fit by the Medical Offer designated by the University. You are, accordingly, required to come along
                            with a Chest X-Ray Photograph for Medical Examination
                        </span>
                        <br>
                        <br>
                        <br>
                        <p>Signature ..............................................</p>
                        <p>Registrar: Kweku Ansah</p>
                    </div>

                </div>
                <button type="submit" class="btn btn-primary w-25 ml-5" @click.prevent="download">Download as PDF</button>
                </div>
            </div>
            </div>
    </div>
</template>


<script>

import axios from "axios"
import html2pdf from "html2pdf.js"

export default {
    name: "EditAdmission",
    data(){
        return{
            student_name: "",
            student_number: "",
            student_address: "",
            email: "",
            program_name: "",
            title: "",
            loading: false,
            error1: "",
            error2: "",
            error3: "",
            error4: "",
            error5: "",
            error6: "",
            alert: "",
            alert_show: "",
            res: ""
        }
    },
    methods: {
        save(){
            if(!this.student_name) this.error1 = "student name required";
            else this.error1 = "";
            if(!this.student_number) this.error6 = "student number required";
            else this.error6 = "";
            if(!this.student_address) this.error3 = "student address required";
            else this.error3 = "";
            if(!this.email) this.error4 = "phone number required";
            else this.error4 = ""
            if(!this.program_name) this.error5 = "program name required"
            else this.error5 = ""
            if(!this.title) this.error2 = "title required";
            else this.error2 = ""

            if(this.student_name.length != 0 && this.student_number.length != 0 && this.student_address.length != 0 && this.email.length != 0 && this.program_name.length != 0 && this.title.length != 0){
                this.loading = true
                let vm = this

                setTimeout(function(){
                    vm.AjaxAdmissionCreate(vm.student_name,vm.student_number,vm.student_address,vm.email,vm.program_name,vm.title)
                },1000)
            }
        },
        async AjaxAdmissionCreate(student_name,student_number,student_address,email,program_name,title){

            let letter_id =this.$route.params.id
            try {

                let admission_res = await axios({
                        url: `http://agile-brook-14477.herokuapp.com/api/v1/admission_template/update?id=${letter_id}`,
                        method: "PUT",
                        data: {student_name:student_name,student_number:student_number,student_address:student_address,email:email,program_name:program_name,title:title},
                        dataType: "JSON",
                    })

                    if(admission_res.data.res === "updated"){
                        this.loading = false
                        this.res = "updated"
                        this.alert_show = true
                        this.alert = "Admission letter updated successfully"
                    }
            } catch (error) {
                if(error){
                        this.loading = false
                        this.res = "error"
                        this.alert_show = true
                        this.alert = "An error has occured, try again later"
                }
            }
        },
        download(){
                let opt = {
                          margin:       1,
                          filename:     this.student_number,
                          image:        { type: 'jpeg', quality: 0.98 },
                          html2canvas:  { scale: 1 },
                          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                        };
                const contentHtml = this.$refs.admission_letter.innerHTML;
                console.log(contentHtml)
                let worker = html2pdf()
                worker.from(contentHtml).set(opt).save()

            },
    },
   async created(){
        let admission_token = localStorage.getItem("user_token")
        let category = localStorage.getItem("user_category")
        console.log(category)

        if(admission_token == null){
            this.$router.push({name: "UserSignIn"})
        }
        if(category != "Admission Sector"){
            this.$router.push({name: "UserSignIn"})
        }

        let route_id = parseInt(this.$route.params.id)


        if(!isNaN(route_id)){
            try {
                let edit_letter = await axios({
                    url: `http://agile-brook-14477.herokuapp.com/api/v1/admission_template/show?id=${route_id}`,
                    method: "GET",
                })

                if(edit_letter.data.res === "found"){
                    this.student_name = edit_letter.data.data.student_name
                    this.student_number = edit_letter.data.data.student_number
                    this.student_address = edit_letter.data.data.student_address
                    this.program_name = edit_letter.data.data.program_name
                    this.email = edit_letter.data.data.email
                    this.title = edit_letter.data.data.title
                }
            } catch(e) {
            // statements
                console.log(e);
            }

        }
    }

}

</script>

<style scoped>

</style>