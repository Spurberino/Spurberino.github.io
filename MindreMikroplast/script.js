document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function() {myFunction()};
            
    var navbar = document.getElementById("navbar");
    var content = document.getElementById("content");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset > 297) {
            navbar.classList.add("sticky");
            content.classList.add("contentsticky");
        } else {
            navbar.classList.remove("sticky");
            content.classList.remove("contentsticky")
        }
    }
})