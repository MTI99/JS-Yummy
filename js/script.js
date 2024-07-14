var mainMeals = []
let isLoading = false;

// Function to show loading screen
function showLoadingScreen() {
    isLoading = true;
    $('#loadingScreen').fadeIn();
}

// Function to hide loading screen
function hideLoadingScreen() {
    isLoading = false;
    $('#loadingScreen').fadeOut();
}


$(document).ready(function(){
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn ").on("click", function(){
        if($(".side-bar").css("left") == "0px"){
            $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
            $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
        } else { 
            $(".side-bar").animate({left: `0px` },500)
            $(".togg-btn  ").html('<i class="fa-solid fa-x fs-1"></i>')
        }
    })
    mainDisplay()
})

// Events

// Search
$(".search").on("click",function(){
    showLoadingScreen(); 
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
    getSearch().then (hideLoadingScreen());
    
    $(".search-inputs").css("display","block")
    $(".search-inputs").html(
        `
        <div class="form container d-flex justify-content-center pt-5">
        <input type="text" class="form-control form-input w-25 me-4 " id="srch-inp" placeholder="Search Meals...">
        <input type="text" class="form-control form-input w-25 " id="srch-lttr" placeholder="Meal First Letter..." maxlength="1">
        </div>

        `
        
    )

})
// Category
$(".category").on("click",function(){
    showLoadingScreen(); 
    mainMeals = []
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
    $(".search-inputs").css("display","none")
    getCategory().then (hideLoadingScreen());
    getCatDetails().then (hideLoadingScreen());
})

// Area
$(".area").on("click",function(){
    showLoadingScreen(); 
    mainMeals = []
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
    $(".search-inputs").css("display","none")
    getArea().then (hideLoadingScreen());

})

// Ingerdiants
$(".ingred").on("click",function(){
    showLoadingScreen(); 
    mainMeals = []
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
    $(".search-inputs").css("display","none")
    getIngred().then (hideLoadingScreen());

})

// Contact Us 
$(".contact").on("click",function(){
    showLoadingScreen(); 
    mainMeals = []
    $(".side-bar").animate({left: `-${$(".side-content").innerWidth()}px` },500)
    $(".togg-btn  ").html('<i class="fa-solid fa-bars fs-1"></i>')
    $(".search-inputs").css("display","none")
    displayContact().then(hideLoadingScreen());
    

})



// Main Display 
async function mainDisplay(){
    showLoadingScreen(); 
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let data = await response.json();

    mainMeals.push(...data.meals);
    displaySearch(mainMeals);

    hideLoadingScreen();

}



// Search
async function getSearch() {
    
    let response =  await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json()

    mainMeals.push(...response.meals)
    displaySearch(mainMeals)
    $("#srch-inp").on("keyup", function (e) {
        let searchedchar = e.target.value
        searchByName(searchedchar)
    })

    $("#srch-lttr").on("keyup", function (e) {
        let searchedchar = e.target.value
        console.log(searchedchar);
        searchByFLetter(searchedchar)
    })



}

async function searchByName(key) { 
    if (key == "" ) { 
        displaySearch(mainMeals);
    return
    }  


    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)).json()
    response.meals ? displaySearch(response.meals) : displaySearch([])

}


async function searchByFLetter(key) { 
    if (key == "" ) { 
        displaySearch(mainMeals);
    return
    }  


    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`)).json()
    response.meals ? displaySearch(response.meals) : displaySearch([])
    



}


function displaySearch(arr) {
    let cartona = ``
    for (let i = 0; i < arr.length; i++) {
        

        cartona += `
        <div class="col-md-3 srch-col">
                <div class="p-1  ">
                    <div class="img position-relative ">
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 rounded-3" >
                        <div class="img-text position-absolute  
                                    bg-white text-black start-0
                                    end-0 top-0 bottom-0 opacity-50
                                    d-flex align-items-center ps-4
                                    m-0 justify-content-center d-none
                                    " onclick='diplayMealDeatils(${arr[i].idMeal})'>
                            <h2 class="">${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }

    $("#mainPage").html(cartona)

}

async function diplayMealDeatils(id){
    $(".search-inputs").css("display","none")
    $("#mainPage").html("")

    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json()
    let clickedMeal = response.meals[0]
    
    let recipes = ``

    for (let i = 1; i <= 20; i++) {
        if (clickedMeal[`strIngredient${i}`]) {
            recipes += `<li class="alert alert-info m-2 p-1">${clickedMeal[`strMeasure${i}`]} ${clickedMeal[`strIngredient${i}`]}</li>`
        }
    }

    $("#mainPage").html(`
    
    <div class="col-md-4">  
        <div class="meal-details">
            <div class=" w-100">
            <img src="${clickedMeal.strMealThumb}" class="w-100" alt="...">
            <div class=" align-self-start">
            <p class="fs-2 text-center bg-light text-black ">${clickedMeal.strMeal}</p>
            </div>
            </div>
        </div>
    </div>


    <div class="col-md-8">
        <div class="details">
            <h1 class="fw-bold">Instructions</h1>
            <p class="fs-4" >${clickedMeal.strInstructions}</p>
            <ul class="list-unstyled fs-3">
                <li>Area : ${clickedMeal.strArea}</li>
                <li>Category : ${clickedMeal.strCategory}</li>
                <li>Recipes :
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <span class="badge me-3 d-flex flex-wrap">${recipes}</span>

                </ul>


                </li>
                <li class = "mt-3">Tags :${clickedMeal.strTags}</li>
            </ul>
            <button class="btn btn-success me-3 py-2 px-4">
            <a href="${clickedMeal.strSource}" class="text-decoration-none text-white" target="blank">Source</a>
            </button>
            <button class="btn btn-danger py-2 px-4">
            <a href="${clickedMeal.strYoutube}" class="text-decoration-none text-white" target="blank">Youtube</a>
            </button>
        </div>
    </div>
        
            
    
    
    
    
    
    `)

}






// Category 
async function getCategory() {
    let response =  await (await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")).json()


    mainMeals.push(...response.categories)
    displayCategory(mainMeals)
}


function displayCategory(arr) {
    
    let cartona = ``

    for (let i = 0; i < arr.length; i++) {
        

        cartona += `
        

        <div class="col-md-3 cat-col">
                <div class="p-1"  >
                    <div class="img position-relative" >
                        <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 rounded-3" >
                        <div class="img-text position-absolute  
                                    bg-white text-black start-0
                                    end-0 top-0 bottom-0 opacity-50
                                    d-flex align-items-center ps-4
                                    m-0 justify-content-center d-none
                                    "onclick="getCatDetails('${arr[i].strCategory}')" >
                            <h2 class="">${arr[i].strCategory}</h2>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }

    $("#mainPage").html(cartona)




}

async function getCatDetails(categoryName) {

    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)).json()
    let clickedCat = response.meals.slice(0,20)

    let cartona = ``
    for (let i = 0; i < clickedCat.length; i++) {
    cartona += `
    <div class="col-md-3 srch-col">
    <div class="p-1  ">
        <div class="img position-relative ">
            <img src="${clickedCat[i].strMealThumb}" alt="" class="w-100 rounded-3" >
            <div class="img-text position-absolute  
                        bg-white text-black start-0
                        end-0 top-0 bottom-0 opacity-50
                        d-flex align-items-center ps-4
                        m-0 justify-content-center d-none
                        " onclick='diplayMealDeatils(${clickedCat[i].idMeal})'>
                <h2 class="">${clickedCat[i].strMeal}</h2>
            </div>
        </div>
    </div>
</div>



    `
    
                
        


}
$("#mainPage").html(cartona)

    }



// Area
async function getArea() {
    let response =  await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")).json()

    mainMeals.push(...response.meals)
    displayArea(mainMeals)
}

function displayArea(arr) {
    
    let cartona = ``

    for (let i = 0; i < arr.length; i++) {
        

        cartona += `
        

        <div class="col-md-3 cat-col">
                <div class="p-1  ">
                    <div class="img position-relative ">
                        <img src="images/foodArea.png" alt="" class="w-100 rounded-3" >
                        <div class="img-text position-absolute  
                                    bg-white text-black start-0
                                    end-0 top-0 bottom-0 opacity-75
                                    d-flex align-items-center ps-4
                                    m-0 justify-content-center d-none
                                    " onclick="getAreaDetails('${mainMeals[i].strArea}')">
                            <h2 class="">${mainMeals[i].strArea}</h2>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }

    $("#mainPage").html(cartona)



}

async function getAreaDetails(areaName) {

    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)).json()
    let clickedArea = response.meals.slice(0,20)

    let cartona = ``
    for (let i = 0; i < clickedArea.length; i++) {
    cartona += `
    <div class="col-md-3 srch-col">
    <div class="p-1  ">
        <div class="img position-relative ">
            <img src="${clickedArea[i].strMealThumb}" alt="" class="w-100 rounded-3" >
            <div class="img-text position-absolute  
                        bg-white text-black start-0
                        end-0 top-0 bottom-0 opacity-50
                        d-flex align-items-center ps-4
                        m-0 justify-content-center d-none
                        " onclick='diplayMealDeatils(${clickedArea[i].idMeal})'>
                <h2 class="">${clickedArea[i].strMeal}</h2>
            </div>
        </div>
    </div>
</div>



    `
    
                
        


}
$("#mainPage").html(cartona)

    }


// Ingrediants get&display
async function getIngred() {
    let response =  await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")).json()

    console.log(response);

    mainMeals.push(...response.meals)
    displayIngred(mainMeals)
}

function displayIngred(arr) {
    
    let cartona = ``

    for (let i = 0; i < 20; i++) {
        

        cartona += `
        

        <div class="col-md-3 cat-col">
                <div class="p-1  ">
                    <div class="img position-relative ">
                        <img src="images/ingredion.jpg" alt="" class="w-100 rounded-3" >
                        <div class="img-text position-absolute  
                                    bg-white text-black start-0
                                    end-0 top-0 bottom-0 opacity-75
                                    d-flex align-items-center ps-4
                                    m-0 justify-content-center d-none
                                    " onclick="getIngreDetails('${mainMeals[i].strIngredient}')">
                            <h2 class="">${mainMeals[i].strIngredient}</h2>
                        </div>
                    </div>
                </div>
            </div>
    
        `
    }

    $("#mainPage").html(cartona)



}

async function getIngreDetails(ingredName) {

    let response  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredName}`)).json()
    let clickedIngred = response.meals.slice(0,20)

    let cartona = ``
    for (let i = 0; i < clickedIngred.length; i++) {
    cartona += `
    <div class="col-md-3 srch-col">
    <div class="p-1  ">
        <div class="img position-relative ">
            <img src="${clickedIngred[i].strMealThumb}" alt="" class="w-100 rounded-3" >
            <div class="img-text position-absolute  
                        bg-white text-black start-0
                        end-0 top-0 bottom-0 opacity-50
                        d-flex align-items-center ps-4
                        m-0 justify-content-center d-none
                        " onclick='diplayMealDeatils(${clickedIngred[i].idMeal})'>
                <h2 class="">${clickedIngred[i].strMeal}</h2>
            </div>
        </div>
    </div>
</div>



    `
    
                
        


}
$("#mainPage").html(cartona)

    }



// Contact Us 

async function displayContact() {
    $("#mainPage").html(`
    <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
  
                  <form class="mx-1 mx-md-4" id="signupForm">
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" oninput="validateInputs()" />
                        <label class="form-label" for="form3Example1c">Your Name</label>
                        <span id="nameError" class="text-danger"></span>
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" oninput="validateInputs()" />
                        <label class="form-label" for="form3Example3c">Your Email</label>
                        <span id="emailError" class="text-danger"></span>
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" class="form-control" oninput="validateInputs()" />
                        <label class="form-label" for="form3Example4c">Password</label>
                        <span id="passwordError" class="text-danger"></span>
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4cd" class="form-control" oninput="validateInputs()" />
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        <span id="repeatPasswordError" class="text-danger"></span>
                      </div>
                    </div>
  
                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" onclick="validateInputs()" />
                      <label class="form-check-label" for="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                      <span id="termsError" class="text-danger"></span>
                    </div>
  
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" id="registerButton" class="btn btn-primary btn-lg" disabled>Register</button>
                    </div>
  
                  </form>
  
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid" alt="Sample image">
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    `);
}

function validateInputs() {
    let name = document.getElementById("form3Example1c").value;
    let email = document.getElementById("form3Example3c").value;
    let password = document.getElementById("form3Example4c").value;
    let repeatPassword = document.getElementById("form3Example4cd").value;
    let terms = document.getElementById("form2Example3c").checked;

    let isNameValid = name !== "";
    let isEmailValid = email !== "" && validateEmail(email);
    let isPasswordValid = password !== "";
    let isRepeatPasswordValid = repeatPassword === password;
    let isTermsChecked = terms;

    document.getElementById("nameError").innerText = isNameValid ? "" : "Please enter your name.";
    document.getElementById("emailError").innerText = isEmailValid ? "" : "Please enter a valid email address.";
    document.getElementById("passwordError").innerText = isPasswordValid ? "" : "Please enter your password.";
    document.getElementById("repeatPasswordError").innerText = isRepeatPasswordValid ? "" : "Passwords do not match.";
    document.getElementById("termsError").innerText = isTermsChecked ? "" : "You must agree to the terms of service.";

    let isFormValid = isNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid && isTermsChecked;

    document.getElementById("registerButton").disabled = !isFormValid;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
