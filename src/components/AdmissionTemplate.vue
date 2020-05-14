<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">Use the template to create an admission letter for Admitted Students</a>
                    <router-link to="/user/ShowAdmissionLetters" class="btn btn-primary float-right">Show Letters</router-link>

                </div>
                </nav>

                <div class="row mt-4 ml-3 mr-3">
                <div class="col-sm-4">
                <div class="card shadow-lg">
                <div class="card-body text-center">
                    <h5 class="card-title">Enter relevant details below</h5>
                    <span class="alert" :class="[res === 'created'? 'alert-success': 'alert-danger']" v-show="alert_show">{{alert}}</span>
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
                    <button type="submit" class="btn btn-primary" @click.prevent="submit">Submit</button>
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
                        <p>
                           1. I write , with reference to your application, to offer you admission to this University to pursue a 4 year degree
                            programme leading to the award of <b>{{program_name}}</b>.
                        </p>
                        <p>
                            2. This is offer is based on the available information that you have satisfied the Entry Requirement for the above mentioned programme of study.
                        </p>
                        <p>
                            3. should the information you have provided be found at any time to be false or should you be found to be deficient
                            in the entry requirement in the course of your study, you will be dimissed by the University.
                        </p>
                        <p>
                            4. Your admission is also subject to your being certified medically fit by the Medical Offer designated by the University. You are, accordingly, required to come along
                            with a Chest X-Ray Photograph for Medical Examination
                        </p>
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
    name: "Admission",
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
        submit(){
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
            try {
                let token = localStorage.getItem("user_token")
                let admission_res = await axios({
                        url: "http://agile-brook-14477.herokuapp.com/api/v1/admission_template/create",
                        method: "POST",
                        data: {student_name:student_name,student_number:student_number,student_address:student_address,email:email,program_name:program_name,title:title},
                        dataType: "JSON",
                        headers: {"Authorization": `Bearer ${token}`}
                    })

                    if(admission_res.data.res === "created"){
                        this.loading = false
                        this.res = "created"
                        this.alert_show = true
                        this.alert = "Admission letter created successfully"
                    }
                    if(admission_res.data.res === "failed"){
                        this.loading = false
                        this.res = "failed"
                        this.alert_show = true
                        this.alert = "Failed to create admission letter, try again later"
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
                          html2canvas:  { scale: 2 },
                          jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
                        };
                const contentHtml = this.$refs.admission_letter.innerHTML;
                console.log(contentHtml)
                let worker = html2pdf()
                worker.from(contentHtml).set(opt).save()

            },
    },
    created(){
        let admission_token = localStorage.getItem("user_token")
        let category = localStorage.getItem("user_category")
        console.log(category)

        if(admission_token == null){
            this.$router.push({name: "UserSignIn"})
        }
        if(category != "Admission Sector"){
            this.$router.push({name: "UserSignIn"})
        }
    }

}

</script>

<style scoped>

</style>