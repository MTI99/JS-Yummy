// // CRUD 
// // C ==> create
// // R ==> retieve
// // U ==> Update
// // D ==> delete
// // S ==> search

// var productName = document.getElementById("productName")
// var productPrice = document.getElementById("productPrice")
// var productCategory = document.getElementById("productCat")
// var productDesc = document.getElementById("productDesc")
// var productImage = document.getElementById("productImage")
// var addBttn = document.getElementById("addBttn")
// var updateBttn = document.getElementById("updateBttn")
// var searchValue = document.getElementById("searchInput")
// var currentIndex;
// var listOfProducts = []

// if (localStorage.getItem("listOfProducts") != null) { 
//     listOfProducts = JSON.parse(localStorage.getItem("listOfProducts"))
//     displayProduct(listOfProducts)
// }


// function addProduct() { 
//     var product = { 
//         name: productName.value,
//         price: productPrice.value,
//         category: productCategory.value,
//         desc: productDesc.value,
//         image: "images/phone.png", 
//     }

//     listOfProducts.push(product)
//     updateLocalStorage()
//     displayProduct(listOfProducts)
//     clear()

// }

// function displayProduct(list) { 
//     var cartona = `` 
//     for (i = 0 ;i < list.length ; i++ ) { 
//         cartona += `
//         <div class="col-md-4">
//         <div class="product-card text-white border border-primary rounded-3 overflow-hidden">
//             <div class="img">
//                 <img src="https://picsum.photos/400/400" alt="" class=" w-100">
//             </div>
//             <div class="p-3">
//                 <h2 class="h4"> <span class="text-primary">Name :</span> ${list[i].newName ? list[i].newName : list[i].name  }</h2>
//                 <h3 class="h4"> <span class="text-primary">Price :</span> ${list[i].price}</h3>
//                 <h3 class="h4"> <span class="text-primary">Category :</span> ${list[i].category}</h3>
//                 <h3 class="h4"> <span class="text-primary">Descreption :</span> ${list[i].desc}</h3>
//                 <button onclick="getDataToUpdate(${i})" class="btn btn-outline-warning w-100 my-3">Update</button>
//                 <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100">Delete</button>
//             </div>
//         </div>
//     </div>
//     `
//     }
//     document.getElementById("myData").innerHTML = cartona
// }

// function clear() { 
//     productName.value = null 
//     productPrice.value = null
//     productCategory.value = null
//     productDesc.value = null
//     productImage.value = null
// }

// // function search() { 
    
// //     var searchedItems = []
// //     for (var i = 0 ; i < listOfProducts.length; i++) { 
// //         if (listOfProducts[i].name.toLowerCase().includes(searchValue.value.toLowerCase())) { 
// //             searchedItems.push(listOfProducts[i])
// //         }
// //         displayProduct(searchedItems)
        
// //     }

// // }
// function search(key) { 
//     if (key == "" ) { 
//         displayProduct(listOfProducts);
//         return
//     }  
//     var searchedItems = []

//     for (var i = 0 ; i < listOfProducts.length; i++) { 
//         var item = listOfProducts[i];
//         if (item.name.toLowerCase().includes(key.value.toLowerCase())) { 
//             item.newName = item.name.toLowerCase().replace(key.value.toLowerCase(), `<span class=" bg-warning text-black">${key.value}</span>`)
//             searchedItems.push(item)
//         }
        
//         displayProduct(searchedItems)
//         console.log(item);
        
//     }

// }






// function deleteProduct(index) { 
//     listOfProducts.splice(index,1)
//     updateLocalStorage()
//     displayProduct(listOfProducts)
// }

// function getDataToUpdate(index) { 
//     currentIndex = index
//     productName.value = listOfProducts[index].name
//     productPrice.value = listOfProducts[index].price
//     productCategory.value = listOfProducts[index].category
//     productDesc.value = listOfProducts[index].desc
//     addBttn.classList.add("d-none")
//     updateBttn.classList.remove("d-none")
// }


// function updateProduct() {
//     listOfProducts[currentIndex].name = productName.value
//     listOfProducts[currentIndex].price = productPrice.value
//     listOfProducts[currentIndex].category = productCategory.value
//     listOfProducts[currentIndex].desc = productDesc.value
//     displayProduct(listOfProducts)
//     updateLocalStorage()
//     addBttn.classList.remove("d-none")
//     updateBttn.classList.add("d-none")
//     clear()

// } 

// function updateLocalStorage() { 
//     localStorage.setItem("listOfProducts", JSON.stringify(listOfProducts))

// }







// $("button").on("click",function(){
    
//     jQuery(".test").animate( {width: "100%"} ,1000)
//     jQuery(".test").animate( {height: "100vh"} ,1000 , function () {
//         jQuery(".img").fadeIn(1500)
//     })
    

// })





// var mainMeals = []

// let mealsHttp = new XMLHttpRequest()


// mealsHttp.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s=" )
// mealsHttp.send()

// mealsHttp.addEventListener("load",function() {
//     res = JSON.parse(mealsHttp.response)
    
//     mainMeals.push(res)

//     console.log(mainMeals);
//     displayMain()
// })






// Side Bar




// $(document).ready(function () {
    
// $(".togg-btn ").on("click", function(){
//     console.log($(".side-content").innerWidth());
    
//     if($(".side-bar").css("left") == "0px"){
//         $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
//         $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
//     } else { 
//         $(".side-bar").animate({left: `0px` },500)
//         $(".togg-btn  ").html('<i class="fa-solid fa-x fs-1"></i>')
//     }

    

// })


// });

// Search

// $(".search").on("click",function(){
    
//     $("#mainPage").html(
//         `
//         <div class="form container d-flex justify-content-center my-5">
//         <input type="text" class="form-control form-input w-25 me-4 " placeholder="Search Meals...">
//         <input type="text" class="form-control form-input w-25 " placeholder="Meal First Letter...">
//         </div>

//         `
//     )
// })





// // Add Meals

// async function addMeal() { 
//     let respone = await fetch(``)
//     respone = await respone.json()   
//     console.log(respone.meals);

//     displaMeals(respone.meals.slice(0, 20))
//     $(".inner-loading-screen").fadeOut(300)
// }





// Main Meals

// function displayMain() { 

//     let cartona = ``

//     for (let i = 0; i < mainMeals.length; i++) {

//         cartona += `
//         <div class="col-md-3">
//         <div onclick="getMealDetails('${mainMeals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
//             <img class="w-100" src="${mainMeals[i].strMealThumb}" alt="" srcset="">
//             <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
//                 <h3>${mainMeals[i].strMeal}</h3>
//             </div>
//         </div>
//     </div>
        
//         `
        
        
        
// }

    
//         $("#mainPage").html(
//             `
//             <div class="col-md-3">
//             <div onclick="getMealDetails('')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
//                 <img class="w-100" src="" alt="" srcset="">
//                 <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
//                     <h3>gfdddddddddddddddd</h3>
//                 </div>
//             </div>
//         </div>
//             `
//         )
//     }

















    // var cartona = `` 
    // for (i = 0 ;  i < mainMeals.length ; i++ ) { 
    //     cartona += `
                
    //     <div class="col-md-3">
    //     <div class="p-3 ">
    //         <div class="img position-relative">
    //             <img src="https://picsum.photos/200" alt="" class="w-100" >
    //             <div class="img-text position-absolute  
    //                         bg-white text-black start-0
    //                         end-0 top-0 bottom-0 opacity-50
    //                         d-flex align-items-center ps-4
    //                         m-0
    //                         ">
    //                 <h2 class=>Meal Name</h2>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    // `
    // }
    // document.querySelector("#mainPage").innerHTML = cartona




// function displayCategory() {
    
// }


// function displayArea() {
    
// }


// function displayIngred() {
    
// }

// function signUp() {
    
// }













