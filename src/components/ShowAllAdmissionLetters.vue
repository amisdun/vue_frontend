<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">View all Admission letter details</a>
                </div>
            </nav>

            <div class="row">
<div class="col-sm-4" v-for="(letter,key) in all_admission_letters" :key="key">
    <div class="card mb-4 mt-3 ml-3">
        <div class="card-body" :id="letter.id">
            <h5 class="card-title">Admission Details</h5>
            <p class="card-text">Name: {{letter.student_name}}</p>
            <p class="card-text">Student ID: {{letter.student_number}}</p>
            <p class="card-text">Email: {{letter.email}}</p>
            <p class="card-text">Address: {{letter.student_address}}</p>
            <p class="card-text">Program Name: {{letter.program_name}}</p>
            <a href="#" class="btn btn-danger float-left" @click.prevent="delete_letter">Delete</a>
            <a href="#" class="btn btn-info float-right" @click.prevent="edit">Edit</a>
        </div>
    </div>
</div>
</div>
	</div>
</template>

<script type="text/javascript">

	import axios from "axios"

	export default{
		name: "ShowAdmissionLetters",
		data(){
			return {
				all_admission_letters: []

			}
		},
		methods: {
			async delete_letter(e){
				let id = e.currentTarget.parentElement.id
				let deleted = await axios({
					url: `http://agile-brook-14477.herokuapp.com/api/v1/admission_template/destroy?id=${id}`,
					method: "DELETE"
				})

				if(deleted.data.res === "deleted"){
					location.reload()
					let element = e.currentTarget.parentElement.parentElement

					element.remove()
				}
			},
			edit(e){
				let id =e.currentTarget.parentElement.id
				this.$router.push({path: `/user/EditAdmission/${id}`})
			}
		},
		async created(){
				let letter_token = localStorage.getItem("user_token")
let category = localStorage.getItem("user_category")
if(letter_token == null){
this.$router.push({name: "UserSignIn"})
}
if(category != "Admission Sector"){
this.$router.push({name: "UserSignIn"})
}
if(letter_token != null && category == "Admission Sector"){
let all_letters = await axios({
url: "http://agile-brook-14477.herokuapp.com/api/v1/admission_template/index",
method: "GET",
headers: {"Authorization": `Bearer ${letter_token}`}
})
if(all_letters.data.data.length >= 1){
this.all_admission_letters = [...all_letters.data.data]
console.log(this.all_admission_letters)
}
}
		},
		mounted(){

		}
	}
</script>

<style scoped>

</style>