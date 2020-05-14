<template>
    <div>
                        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">Admin Page</a>

                </div>
                </nav>

                <div class="text-center">
        <div class="jumbotron shadow-lg p-3 mb-5 bg-white rounded">
        <router-link to="/admin/signin" class="float-right btn btn-outline-primary">Back</router-link>
        <p class="text-md-left text-uppercase font-weight-bolder">Register User Accounts</p>
        <span class="alert" :class="[res === 'created'? 'alert-success' : 'alert-danger']" v-show="user_signup">{{signup}}</span>
                <form>
            <div class="form-group">
            <input type="text" v-model="username" class="form-control form-control-lg mt-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username">
            <span class="text-danger">{{error1}}</span>
            </div>
            <div class="form-group">
            <input type="password" v-model="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Password">
            <span class="text-danger">{{error2}}</span>
            </div>
            <div class="form-group">
            <select class="form-control form-control-lg" v-model="category" >
                <option value="" disabled>Select Category</option>
                <option>Account Sector</option>
                <option>Admission Sector</option>
            </select>
            <span class="text-danger">{{error3}}</span>
            </div>
            <div class="spinner-border text-info" role="status" v-show="loading">
            <span class="sr-only">Loading...</span>
            </div><br>
            <button type="submit" class="btn btn-primary" @click.prevent="submit">Submit</button>
            </form>
        </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "Admin",
    data(){
        return {
            error1: "",
            error2: "",
            error3: "",
            loading: false,
            username: "",
            password: "",
            category: "",
            user_signup: false,
            signup: "",
            res: ""

        }
    },
    methods: {
        submit(){
            if(!this.username) this.error1 = "username required";
            else this.error1 = ""
            if(!this.password) this.error2 = "password required";
            else this.error2 = ""
            if(!this.category) this.error3 = "select category";
            else this.error3 = ""

            if(this.username.length != 0 && this.password.length != 0 && this.category.length != 0){
                this.loading = true
                let vm = this

                setTimeout(function(){
                    vm.AjaxUserSignUp(vm.username,vm.password,vm.category)
                })
            }
        },
        async AjaxUserSignUp(username,password,category){
            let admin_token = localStorage.getItem("admin_token")
            try {
                let user_signup_res = await axios({
                url: "http://agile-brook-14477.herokuapp.com/api/v1/user_signup/create",
                method: "POST",
                data: {username: username, password: password, category: category},
                dataType: "JSON",
                headers: {'Authorization': `Bearer ${admin_token}` }
                })

                if(user_signup_res.data.res === "created"){
                    this.res = user_signup_res.data.res
                    this.loading = false
                    this.user_signup = true
                    this.signup = "User Account Added successfully"
                }
                if(user_signup_res.data.res === "exist"){
                    this.res = user_signup_res.data.res
                    this.loading = false
                    this.user_signup = true
                    this.signup = "User details already axist"
                }
            } catch (error) {
                this.loading = false
                this.user_signup = true
                this.signup = "An error has Occured, try again later"
            }
        }

    },
    created(){
        let token = localStorage.getItem("admin_token")

        if(!token){
            this.$router.push({name: "AdminSignIn"})
        }
    }

}
</script>

<style scope>
    .jumbotron{
        margin-right: 30vw;
        margin-left: 30vw;
        margin-top: 10vw;
        height: 100%
    }
</style>