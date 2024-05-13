let categoriesCard = document.getElementById("categoriesCard")

async function getCategories() {
    categoriesCard.innerHTML = " "
    await firebase.database().ref("Category").get()
        .then((snap) => {
            let categories = Object.values(snap.val())
            for (const data in categories) {
                categoriesCard.innerHTML += `
                <div class = "col-lg-4 col-md-6 col-sm-6 col-12">              
                <div class="containerr" data-aos="flip-left">
                <div class="carda mt-3">
                    <div class="imgBx">
                    <img src=${categories[data]["cateImage"]} class = "img-fluid rounded-top">
                    </div>
        
                    <div class="contentBx">
        
                        <h2>${categories[data]["cateName"]}</h2>
        
                        <div class="size">
                        ${categories[data]["cateDescription"]}
                        </div>
        
                        <a href="#" class="btn btn-primary" id = ${categories[data]["cateKey"]} onClick = viewDish(this)>View Dish</a>
                    </div>
        
                </div>
            </div>
            </div>
          

                `

            }
        })
        .catch((e) => {
            console.log(e);
        })

}

function viewDish(e) {
    localStorage.setItem("current_Category_Key", e.id)
    window.location.href = "../Dish/index.html"
}

getCategories()

function logOut() {
    localStorage.clear()
    window.location.replace("../../index.html")
}

