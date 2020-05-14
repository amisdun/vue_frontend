<template>
    <div>
        <div class="text-center">
        <div class="jumbotron shadow-lg p-3 mb-5 bg-white rounded">
        <h1 class="display-4">Welcome to UENR Account and Admission services</h1>
        <p class="lead">Login here as an Admin or User</p>
        <hr class="my-4"> 
        <router-link class="btn btn-primary btn-lg mr-4 mt-3" to="/admin/signin" role="button"><li class="fas fa-key"></li> Admin</router-link>
        <router-link class="btn btn-primary btn-lg ml-4 mt-3" to="/user/signin" role="button"><li class="fas fa-key"></li> User</router-link>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    
}
</script>

<style scoped>
    .jumbotron{
        margin-right: 20vw;
        margin-left: 20vw;
        margin-top: 10vw;
        height: 100%
    }
</style>