<template>
    <div>
        <div class="text-center">
        <div class="jumbotron shadow-lg p-3 mb-5 bg-white rounded">
        <router-link to="/" class="float-right btn btn-outline-primary">Back</router-link>
        <p class="text-md-left text-uppercase font-weight-bolder">User Login</p>
        <span class="text-danger alert alert-danger" v-show="failed">{{Login_failed}}</span>
                <form>
            <div class="form-group">
            <input type="text" v-model="username" class="form-control form-control-lg mt-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username">
            <span class="text-danger">{{error1}}</span>
            </div>
            <div class="form-group">
            <input type="password" v-model="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Enter Password">
            <span class="text-danger">{{error2}}</span>
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
import { setTimeout } from 'timers';

export default {
    name: "user",
    data(){
        return {
            error1: "",
            error2: "",
            username: "",
            password: "",
            loading: false,
            failed: false,
            Login_failed: ""
        }
    },
    methods: {
        submit(){
            this.failed = false
            if(!this.username) this.error1 = "username required";
            else this.error2 = "";
            if(!this.password) this.error2 = "password required";
            else this.error2 = ""

            if(this.username.length != 0 && this.password.legnth != 0){
                this.loading = true
                let vm = this
                console.log(this.username)
                setTimeout(function(){
                    vm.AjaxUserLogin(vm.username,vm.password)
                },1000)

            }
        },
        async AjaxUserLogin(username,password){
         try {
             let login_responce = await axios({
                url: "http://agile-brook-14477.herokuapp.com/api/v1/user_signin/create",
                method: "POST",
                data: {username: username, password: password},
                dataType: "JSON"
            })
            console.log(login_responce)
            if(login_responce.data.res === "success"){
                if(login_responce.data.data.category === "Account Sector"){
                    this.loading = false
                    this.$router.push({name: "Receipt"})
                }

                if(login_responce.data.data.category === "Admission Sector"){
                    this.loading = false
                    this.$router.push({name: "Admission"})
                }
                localStorage.setItem("user_token",login_responce.data.token)
                localStorage.setItem("user_category",login_responce.data.data.category)
            }
         } catch (error) {
             console.log(error)
             if(error){
                this.loading = false

                this.failed = true
                this.Login_failed = "Invalid Credentials"
            }
         }

        }
    },
    created(){
    },
    mounted(){

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