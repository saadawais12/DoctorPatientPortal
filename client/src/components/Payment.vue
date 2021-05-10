<template>
  <div>
    <div class="jumbotron">
<input
            type="text"
            placeholder="Enter amount.."
            class="form-control x2"
            v-model="amnt"
          />
         
        <button class="btn btn-dark" v-on:click="displayRazorpay">
     PAY NOW
    </button>
    </div>
 

    
  </div>
</template>

<script>
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:5000/api/threads/`,
});
export default {
    name : "Payment",
    data(){
        return {
            auto_s : false,
            amnt : "",
            amountx : "",
            o_id : ""
        }
    },
    methods : {

        openAuto(){
            this.auto_s = true
        },
        auto(){
            this.auto_s = false
        },
        loadScript(src){
         
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          alert("yes")
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  },



        async displayRazorpay(){
    alert(this.amnt)
    const res = await this.loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const data = {
      amnt : this.amnt
    };

    api.post("/razorpay", data).then((res) => {
      this.amountx = res.data.amount,
      this.o_id = res.data.o_id
      const options = {
        key: "rzp_test_P6DhxTFG3ABlG8",
        currency: "PKR",
        amount: this.amountx,
        order_id: this.o_id,
        name: "DocPat",
        description: "Transfer amount to start meeting with doctor",
        //image: 'http://localhost:1337/logo.svg',
        handler: function (response) {
          console.log(response.razorpay_payment_id)
          alert("Succesfully sent payment !")
          window.location.href="/";
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });

    
  },
  
  submit(){
    const data = {
      id: sessionStorage.getItem("ud"),
      number: this.state.phone,
      amount: this.state.amount,
      verified: "0",
      name: this.state.name,
    };
    api.post("/pay", data).then((res) => {
      if (res.data.success) {
        alert("yes")
      } else {
        alert("no")
      }
    });

 
  }
    }
}
</script>