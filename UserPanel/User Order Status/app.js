let userId = localStorage.getItem("UserID")
let orderData = document.getElementById("orderData")

async function getAllOrders() {
  await firebase.database().ref("UsersOrders").child(userId).get()
    .then((snap) => {
      // console.log(snap.val());
      let data = Object.values(snap.val())
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        orderData.innerHTML += `
        <div class = "col-lg-4 col-md-6 col-sm-6 col-12">        
      <div class="ag-format-container">
  <div class="ag-courses_box">
    <div class="ag-courses_item">
      <a href="#" class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>
        <div class="ag-courses-item_title">
        Order No : ${index+1}
        <h5>Total Amount : ${data[index]["toal_amount"]}</h5>
        <h6><b>Status </b> : ${data[index]["status"]}</h6>
        </div>
        
       
        <div class="ag-courses-item_date-box">
        <button href="#" class="btn btn-primary" id = "${data[index]["OrderKey"]}" onclick = "ViewOrderDetails(this)">Order Details</button>
        </div>
      </a>
    </div>


  </div>
</div>
</div>
                         `

      }
    })
}

getAllOrders()



function ViewOrderDetails(e) {
  // console.log(e.id)
  localStorage.setItem("CuurentUser_OrderKey", e.id)
  window.location.href = "../Order Details/index.html"
}

function logOut() {
  localStorage.clear()
  window.location.replace("../../index.html")
}