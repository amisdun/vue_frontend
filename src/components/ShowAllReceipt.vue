
<template>
	<div>
			<nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand text-white" href="#">View all Receipts created</a>
                </div>
            </nav>

            <div class="row mb-4">
    <div class="col-sm-4" v-for="(receipt,key) in all_receipts" :key="key">
        <div class="card mb-4 mt-4 ml-4 mr-1">
            <div class="card-body" :id="receipt.id">
                <h5 class="card-title">Receipt Details</h5>
                <p class="card-text">Name: {{receipt.student_name}}</p>
                <p class="card-text">Amount(word): {{receipt.amount_in_words}}</p>
                <p class="card-text">Amount(Digits): {{receipt.amount_in_numbers}}GHC</p>
                <p class="card-text">Date: {{receipt.date}}</p>
                <p class="card-text">ID Number: {{receipt.index_number}}</p>
                <a href="#" class="btn btn-danger float-left" @click.prevent="delete_receipt">Delete</a>
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
		name: "ShowReceipts",
		data(){
			return {
				all_receipts: []
			}
		},
		methods: {
			async delete_receipt(e){
				let id = e.currentTarget.parentElement.id
				let deleted = await axios({
					url: `http://agile-brook-14477.herokuapp.com/api/v1/receipt_template/destroy?id=${id}`,
					method: "DELETE"
				})

				if(deleted.data.res === "deleted"){
					let element = e.currentTarget.parentElement.parentElement
					console.log(element)
					element.remove()
				}
			},
			edit(e){
				let id =e.currentTarget.parentElement.id
				this.$router.push({path: `/user/EditReceipt/${id}`})
			}
		},
		async created(){
				let receipt_token = localStorage.getItem("user_token")
let category = localStorage.getItem("user_category")
if(receipt_token == null){
this.$router.push({name: "UserSignIn"})
}
if(category != "Account Sector"){
this.$router.push({name: "UserSignIn"})
}
if(receipt_token != null && category == "Account Sector"){
let all_receipts = await axios({
url: "http://agile-brook-14477.herokuapp.com/api/v1/receipt_template/index",
method: "GET",
headers: {"Authorization": `Bearer ${receipt_token}`}
})
if(all_receipts.data.data.length >= 1){
this.all_receipts = [...all_receipts.data.data]
console.log(this.all_receipts)
}
}
		},
		mounted(){

		}
	}
</script>

<style scoped>

</style>