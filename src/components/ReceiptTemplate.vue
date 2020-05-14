<template>
    <div>

                <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">Use the template to make a Receipt for Student fees</a>
                     <router-link to="/user/ShowReceipts" class="btn btn-primary float-right">Show Receipts</router-link>
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
                    <input type="text"  v-model="amount_in_words" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Amount Paid in word">
                    <span class="text-danger">{{error2}}</span>
                    </div>
                    <div class="form-group">
                    <input type="date" v-model="date" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Select Date">
                    <span class="text-danger">{{error3}}</span>
                    </div>
                    <div class="form-group">
                    <input type="number" v-model="amount_in_numbers" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Amount Paid in number">
                    <span class="text-danger">{{error4}}</span>
                    </div>
                    <div class="form-group">
                    <input type="text" v-model="index_number" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Index Number">
                    <span class="text-danger">{{error5}}</span>
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
                <div class="card-body" ref="receipt">
                    <h3 class="card-titile text-center text-success mb-3">University Of Energy And Natural Resources</h3>
                    <h3 class="card-titile text-center mb-5">School fees Receipt</h3>
                    <h5 class="card-text"><span class="badge">Student Full Name:</span> <span class="font-italic pl-5">{{student_name}}</span></h5>
                    <h5 class="card-text"><span class="badge">Amount In Words Name:</span><span class="font-italic pl-5">{{amount_in_words}}</span></h5>
                    <h5 class="card-text"><span class="badge">Amount In Numerics:</span><span class="font-italic pl-5">{{amount_in_numbers}}GHC</span></h5>
                    <h5 class="card-text"><span class="badge"> Number:</span><span class="font-italic pl-5">{{index_number}}</span></h5>
                    <h5 class="card-text"><span class="badge">Date:</span><span class="font-italic pl-5">{{date}}</span></h5>
                    <h5 class="card-text"><span class="badge">Signature:</span> .....................................</h5>

                </div>
                <button type="submit" class="btn btn-primary w-25 ml-5 mb-2" @click.prevent="download">Download as PDF</button>
                </div>
            </div>
            </div>

    </div>
</template>


<script>

import axios from "axios"
import html2pdf from "html2pdf.js"

export default {
    name: "Receipt",
    data(){
        return{
            student_name: "",
            amount_in_words: "",
            amount_in_numbers: null,
            index_number: "",
            date: "",
            error1: "",
            error2: "",
            error3: "",
            error4: "",
            error5: "",
            loading: false,
            res: "",
            alert_show: false,
            alert: ""
        }
    },
    methods: {
        submit(){
            if(!this.student_name) this.error1 = "name is required";
            else this.error1 = "";
            if(!this.amount_in_words) this.error2 = "this feild is required";
            else this.error2 = "";
            if(!this.date) this.error3 = "Please select date";
            else this.error3 = "";
            if(this.amount_in_numbers == null) this.error4 = "this feild is required";
            else this.error4 = "";
            if(!this.index_number) this.error5 = "index number required";
            else this.error5 = "";


            if(this.student_name.length != 0 && this.amount_in_words.length != 0 && this.date.length != 0 && this.amount_in_numbers.length != 0 && this.index_number.length != 0){
                this.loading = true
                let vm = this;

                setTimeout(function(){
                    vm.AjaxReceiptTemplate(vm.student_name,vm.amount_in_words,vm.date,vm.amount_in_numbers,vm.index_number)
                },1000)
            }
        },
        download(){
                let opt = {
                          margin:       1,
                          filename:     this.index_number,
                          image:        { type: 'jpeg', quality: 0.98 },
                          html2canvas:  { scale: 2 },
                          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                        };
                const contentHtml = this.$refs.receipt.innerHTML;
                console.log(contentHtml)
                let worker = html2pdf()
                worker.from(contentHtml).set(opt).save()

            },
        async AjaxReceiptTemplate(student_name,amount_in_words,date,amount_in_numbers,index_number){
            try{

                let token = localStorage.getItem("user_token")
                let receipt_res = await axios({
                    url: "http://agile-brook-14477.herokuapp.com/api/v1/receipt_template/create",
                    method: "POST",
                    data: {student_name: student_name, amount_in_words: amount_in_words,date: date, amount_in_numbers: amount_in_numbers, index_number: index_number},
                    dataType: "JSON",
                    headers: {"Authorization": `Bearer ${token}`}
                })

                if(receipt_res.data.res === "created"){
                    this.loading = false
                    this.res = "created"
                    this.alert_show = true
                    this.alert = "new receipt created successfully"
                }

            } catch(error){
                if(error){
                    this.loading = false
                    this.res = "error"
                    this.alert_show = true
                    this.alert = "An error has occured, please try again later"
                }
            }
        }
    },
    created(){
        let admission_token = localStorage.getItem("user_token")
        let category = localStorage.getItem("user_category")

        if(admission_token == null){
            this.$router.push({name: "UserSignIn"})
        }
        if(category != "Account Sector"){
            this.$router.push({name: "UserSignIn"})
        }

    }

}
</script>

<style scoped>
    span.badge{
        width: 24%;
        padding-top: 10px;
        padding-bottom: 10px;
        font-style: italic;
    }
</style>