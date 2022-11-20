/*------------------------------------
     Function for resposive nav-bar
 -------------------------------------*/

const mobile_nav = document.querySelector('.mobile-navbar-btn');

const nav_link = document.querySelectorAll('.navbar-link');
var div_array = [...nav_link];
div_array.forEach(navbar_link => {
    navbar_link.addEventListener('click', () => {
        toggleNav()
    });
});

const nav_header = document.querySelector('#header');

function toggleNav() {
    nav_header.classList.toggle("active")
}

mobile_nav.addEventListener('click', () => {
    toggleNav()
});



/*--------------------------------------------------------------------
    Function for Hilighting navlinks on scroll to particular section
----------------------------------------------------------------------*/


  // Get all sections that have an ID defined
const sections = document.querySelectorAll(".container");
// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // Get current scroll position
    let scrollY = window.pageYOffset;
  
    // Now we loop through sections to get height, top and ID values for each

    sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 180;
    const sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navbar a[name*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navbar a[name*=" + sectionId + "]").classList.remove("active");
    }
  });
}



/*------------------------------------
        ON SCROLL FUNCTION
 -------------------------------------*/

const nav_elements = document.getElementsByClassName('navbar-link')
const links_array = [...nav_elements]

const linkeach = links_array.forEach(link => {
  const link_name = link.getAttribute("name");
  const element = document.getElementsByName(link_name)


  function scrolldiv() {
    var section = document.getElementById(link_name);
    section.scrollIntoView();
  }

  element[0].addEventListener('click', scrolldiv)
});


/*------------------------------------
        LOADER FUNCTION
 -------------------------------------*/

(function(){    
  var myDiv = document.getElementById("loader");
  var html = document.querySelector("html");
  var section = document.getElementsByClassName("container"),

  // Displaying Loader page for 1 second
  show = function(){
    myDiv.style.display = "block";
    setTimeout(hide, 1000); // 1 seconds
  },

  hide = function(){
    myDiv.style.display = "none";
  };

  // Enabling scroll after 1 second
  scroll_func = function(){
    setTimeout(scroll_enb, 1000); // 1 seconds
  },

  scroll_enb = function(){
    html.style.overflowY = "scroll";
  };

  // Displaying all sections after the loader page is loaded
  display_func = function(){
    setTimeout(display_enb, 1000); // 1 seconds
  },

  display_enb = function(){
    for(var i=0; i<5; i++){
      section[i].style.display = "flex";
    }
  }

  scroll_func();
  display_func();
  show();
})();



/*-------------------------------------------------------------------
        FORM AND EMAIL FUNCTIONALITY WITH ERROR DETECTION(IF ANY)
 --------------------------------------------------------------------*/

        /*--------------------------
                FORM FUNCTION
        ---------------------------*/

// Display if the name field is kept empty else hide
function checkName(){
  var nameVal = document.getElementById("name").value.trim();

  if(nameVal == "") {
    document.getElementById("nameError").style.visibility = "visible"
    return false
  } else {
    document.getElementById("nameError").style.visibility = "hidden";
    return true
  }
}

// Display if the email field is kept empty else hide
function checkEmail() {
  var emailVal = document.getElementById("email").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(emailVal.match(mailformat)) {
    document.getElementById("emailError").style.visibility = "hidden";
    return true
  }else {
    document.getElementById("emailError").style.visibility = "visible"
    return false
  };
}


// Display if the message field is kept empty else hide
function checkMessage() {
  var messageVal = document.getElementById("message").value.trim();

  if(messageVal == "") {
    document.getElementById("messageError").style.visibility = "visible"
    return false
  }else {
    document.getElementById("messageError").style.visibility = "hidden";
    return true
  };
}

      /*-----------------------------------
                SUBMIT BUTTON FUNCTION
        -----------------------------------*/


const submit_btn = document.getElementById('submit')
submit_btn.addEventListener('click', validateForm);
var x = document.getElementById("snackbar");

function validateForm() {
  console.log(checkName());
  checkName();
  checkEmail();
  checkMessage();

  
          /*--------------------------
                MAIL FUNCTION
        ---------------------------*/

// Mail & snackbar functionality is executed if and only if all the fields are filled by the user.
  if(checkName() && checkEmail() && checkMessage() == true){
    x.className = "show";
    // parameters to be passed from form.
    var templateParams = {
      from_name : document.getElementById("name").value,
      email_id : document.getElementById("email").value,
      message : document.getElementById("message").value,
    }

    emailjs.init("fZdjcOta13YiSVWUv");

    emailjs.send('service_pyxsrhx', 'template_160qlew', templateParams).then(function(response) {
      x.innerHTML = "Your message was sent successfully!"
      x.style.backgroundColor = "green"
      // Reset form if message was sent successfully.
      document.getElementById("myform").reset();
    },
  
    // Error function 
    function(error) {
      // If any error occurs at backend while the internet status is on, error will be thrown likewise, else internet error will be thrown.
      internet_status = window.navigator.onLine ? 'on' : 'off'
      if(internet_status == "on") {
        x.innerHTML = `Error! ${error.text}. Please try after sometime.`;
        x.style.backgroundColor = "red"
      } else {
        x.innerHTML = "Error! Please check your internet connection and try again."
        x.style.backgroundColor = "red"
      };
    });
  
    // show error for 4 seconds.
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
  } else {
    x.className = "show";
    x.innerHTML = "Please fill in a valid value in all the required fields!";
    x.style.backgroundColor = "red"}
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
  }


/*-------------------------------------------
        SLIDER FUNCTION FOR PROJECT SECTION
---------------------------------------------*/


const slider = document.querySelector('.project-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

let images = [
  './assets/portfolio.png',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
  './assets/comming-soon.jpg',
];

const slides = document.querySelectorAll(".slides")

slides.forEach((slide, index) => {
let img = new Image();
img.onload = (a) => {
  slide.style.backgroundImage = `url(${images[index]})`;
  // slide.classList.add('has-image');
}
img.src = images[index];
});



// Adding on click function to source code and view project button in project section. 

document.getElementById("portfolio-link-btn").onclick = function () {
  location.href = "https://portfolio.akashgupta75.repl.co/";
}
document.getElementById("portfolio-code-btn").onclick = function () {
  location.href = "https://github.com/SushainGupta/Portfolio";
};


// Checks device type and adds classes accordingly!

const ProjectSlides = document.getElementsByClassName("slides");
const slideArr = [...ProjectSlides]

function deviceCheck(){
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    slideArr.forEach(elem => {
      elem.classList.add("android")
    })
  }
   else if (/iPad|iPhone|iPod/.test(ua)){
    slideArr.forEach(elem => {
      elem.classList.add("ios")
    })
  }else {
    slideArr.forEach(elem => {
      elem.classList.add("otherDevice")
    })
  }
}deviceCheck();

console.log('\x1B[36m Want are you doing here?! You sneaky developer...');
console.log('\x1B[36m Haha have a great time lad 😉');
