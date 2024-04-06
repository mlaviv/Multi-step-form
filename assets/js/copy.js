
/* 
**********************************
function to check what step is it
**********************************
*/

let stepActive ;
let steps = document.querySelectorAll(".stepDetails > div")

const checkStep = () => {
    let slidesBar = document.querySelectorAll(".slideBar > div")

    steps.forEach((step) => {
      if (!step.classList.contains("none")) {
        stepActive = step.classList.value
      }
      return stepActive
    })

    slidesBar.forEach((slideBar) => {
        if (slideBar.classList.value == stepActive) {
            slidesBar.forEach(slideBar => {
                slideBar.classList.remove("stepActive")
            })
            slideBar.classList.add("stepActive")
        }
    });

    return stepActive
}

checkStep();


/* 
********************
change to next step 
********************
*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("next")) {
        let nextStep = stepActive == "personalInfo" 
        ?  "selectPlan"
        : stepActive == "selectPlan"
        ?  "addOns"
        :  "summary"
      
      steps.forEach((step) => {
        step.classList.add("none")
      })

        document.querySelector(`.stepDetails .${nextStep}`).classList.remove("none")
        checkStep();
        checkPay();
        totalShow();
    }
})


/* 
********************
change to prev step 
********************
*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("back")) {
        let nextStep = stepActive == "summary" 
        ?  "addOns"
        : stepActive == "addOns"
        ?  "selectPlan"
        :  "personalInfo" 
    
        steps.forEach((step) => {
          step.classList.add("none")
        })
  
          document.querySelector(`.stepDetails .${nextStep}`).classList.remove("none")
          checkStep();
          checkPay();
    }
})

/* 
********************
change button
********************
*/

let changeBtn = () => {
  steps.forEach((step) => {
    step.classList.add("none")
  })

    document.querySelector(`.stepDetails .selectPlan`).classList.remove("none")
    checkStep();
    checkPay();
}

/* 
********************
confirm button
********************
*/

let confirmBtn = () => {
  steps.forEach((step) => {
    step.classList.add("none")
  })

    document.querySelector(`.stepDetails .thanks`).classList.remove("none")
}


/* 
*****************************************
function to check paid monthly or yearly
*****************************************
*/

let userPaidOption = "Monthly"

let offerPerYear = document.querySelectorAll(".selectPlan .radio-card label span"); 

let checkPay = () => {
  if (userPaidOption == "Yearly") {
    document.querySelector(".payOption .Yearly").style.fontWeight = "600"
    document.querySelector(".payOption .Monthly").style.fontWeight = ""
    document.querySelectorAll(".selectPlan .radio-card label span")[0].textContent = "helllllo"

      offerPerYear.forEach((span) => {
        span.textContent = "2 Month Free"
      })

  } else {
    document.querySelector(".payOption .Monthly").style.fontWeight = "600"
    document.querySelector(".payOption .Yearly").style.fontWeight = ""

    offerPerYear.forEach(element => {
      element.textContent = ""
    })

    }
}

checkPay();

  document.addEventListener("click" , (e) => {
    if (e.target.classList.contains("toggle-label")) {
        userPaidOption = userPaidOption == "Yearly" ? "Monthly" : "Yearly" 
        checkPay();
        costShow(); // defined at line 160
        return userPaidOption  
    }
  })

  /* 
*****************************************
object with  plans and ons Cost
*****************************************
*/

const Cost = {
  Monthly: {
    Monthly: "mo",
    arcade: 9,
    advanced: 12,
    pro: 15,
    OnlineService: 1 ,
    LargerStorage: 2 ,
    CustomizableProfile: 2 
  },
  Yearly: {
    Yearly: "yr",
    arcade: 90,
    advanced: 120,
    pro: 150,
    OnlineService: 10 ,
    LargerStorage: 20 ,
    CustomizableProfile: 20
  }
}


  /* 
*****************************************
function to show the cost 
*****************************************
*/

let costContainer = document.querySelectorAll(".costShow");
let costContainerLabel = document.querySelectorAll("label:has(.costShow)")
  
let costShow = () => {
  costContainer.forEach((element1) => {
    costContainerLabel.forEach((element2) => {
      if (element1.classList.contains(element2.htmlFor)) {
        element1.textContent = `$${Cost[userPaidOption][element2.htmlFor]}/${Cost[userPaidOption][userPaidOption]}`
      }
    })
  })
}

costShow();



  /* 
*****************************************
show total 
*****************************************
*/
let userInfo = {};

let totalShow = () => {
if (stepActive == "summary") {
  userInfo = {
    userName: document.querySelector(".personalInfo input[type='text']"),
    userEmail: document.querySelector(".personalInfo input[type='email']"),
    userTel: document.querySelector(".personalInfo input[type='tel']"),
    userPlan: document.querySelector(".selectPlan input:checked").id + " (" + userPaidOption + ")",
    userPlanCost: `$${Cost[userPaidOption][document.querySelector(".selectPlan input:checked").id]}/${Cost[userPaidOption][userPaidOption]}`,
    totalPer: `Total (${userPaidOption})`,
    totalCost:  `$${Cost[userPaidOption][document.querySelector(".selectPlan input:checked").id]}/${Cost[userPaidOption][userPaidOption]}`,
  } 

  if (document.querySelectorAll(".addOns label:has(input:checked)").length != 0){
    let ons =document.querySelectorAll(".addOns label:has(input:checked)")
    let onssCost = 0;
    ons.forEach((element,index) => {
      userInfo[`ons${index + 1}`] = element.querySelector("h6").textContent;
      userInfo[`ons${index + 1}Cost`] = `$${Cost[userPaidOption][element.htmlFor]}/${Cost[userPaidOption][userPaidOption]}`;
      onssCost += Cost[userPaidOption][element.htmlFor]
      userInfo["totalCost"] = `$${Cost[userPaidOption][document.querySelector(".selectPlan input:checked").id] + onssCost }/${Cost[userPaidOption][userPaidOption]}`
    })
  }
  
  let finishing = document.querySelectorAll(".summary .finishing");

  finishing.forEach((element) => {
    element.textContent = userInfo[element.id]
  })
}
}

totalShow();


