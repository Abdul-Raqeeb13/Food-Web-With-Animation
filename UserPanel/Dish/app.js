let currentDish_CategoryKey = localStorage.getItem("current_Category_Key")
let DishesCard = document.getElementById("DishesCard")
let addToCardList = localStorage.getItem("Add_To_Card")
let mainData = []
let userid = localStorage.getItem("UserID")
// console.log(currentDish_CategoryKey);


async function displayDish() {
    DishesCard.innerHTML = " "
    await firebase.database().ref("Dishes").child(currentDish_CategoryKey).get()
        .then((snap) => {
            // console.log(snap.val());
            if (snap.val() != undefined || snap.val() != null) {
                let dishes = Object.values(snap.val())
                // console.log(dishes);
                mainData = dishes
                for (const dish in dishes) {
                    // console.log(dishes[dish]["DishName"]);
                    DishesCard.innerHTML += `
                    <div class = "col-lg-4 col-md-6 col-sm-6 col-12">              
                    <div class="containerr">
                    <div class="carda mt-3">
                        <div class="imgBx">
                        <img src="${dishes[dish]["DishImage"]}" class="card-img-top" alt="...">
                        </div>
            
                        <div class="contentBx">

                <h2>${dishes[dish]["DishName"]}</h2>

                    <h6>Price ${dishes[dish]["DishPrice"]}</h6>

                <a href="#" class="btn btn-primary" id = ${dish} onClick = AddtoCard(this)>Add to cart</a>
            </div>
            
                    </div>
                </div>
                </div>
                    `

                }

            }

        })
        .catch((e) => {
            console.log(e);
        })

    // console.log(firebase.database().ref("Dishes").child(currentDish_CategoryKey).get());

}

displayDish()



function AddtoCard(e) {
    console.log(JSON.parse(localStorage.getItem("Add_To_Card")));
    var data = JSON.parse(localStorage.getItem("Add_To_Card")) ?? []
    let check = false
    for (let index = 0; index < data.length; index++) {
        if (mainData[e.id]["DishKey"] == data[index]["DishKey"]){
         check = true
         break;
    }
    }

    if (check == false) {
        mainData[e.id]["UserId"] = userid
        mainData[e.id]["Quantity"] = 1
        data.push(mainData[e.id])
        localStorage.setItem("Add_To_Card" ,JSON.stringify(data))

        Toastify({

            text: "Added",

            duration: 3000,

            style: {
                background : "red"
            },
        }).showToast();
    } else {
        Toastify({

            text: "Already added",

            duration: 3000,

            style: {
                background : "red"
            },
        }).showToast();
    }

 

}



function logOut() {
    localStorage.clear()
    window.location.replace("../../index.html")
}