function validate() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confpass = document.getElementById("conf-pass").value;
    let agree = document.getElementById("agree");
    let male = document.getElementById("male");
    let female = document.getElementById("female");
    let dob = document.getElementById("dob").value;
    let nowDate = new Date();
    let dobDate = new Date(dob);
    let age = nowDate.getFullYear()- dobDate.getFullYear();
    
    
        if(username == ""){
           alert("Username must be filled!");
           return false;
        } else if(username.length < 3 || username.length > 15){
            alert("Username must be 3-15 characters!");
            return false;
        } else if(!email.endsWith("@gmail.com")){
            alert("Email must be end with '@gmail.com'!");
            return false;
        } else if(password == ""){
            alert("Pasword must be filled!");
            return false;
        } else if(confpass == ""){
            alert("Confirm Pasword must be filled!");
            return false;
        } else if(confpass !== password){
            alert("Confirm Pasword must be same with password!");
            return false;
        } else if(!male.checked && !female.checked){
            alert("You must choose gender!");
            return false;
        // } else if(male.checked && female.checked){
        //     alert("You can only have choose 1 gender!");
        //     return false;
        } else if(age < 18){
            alert("Minimum Age is 18!");
            return false;
        } else if(dob == ""){
            alert("Date must be filled!");
            return false;
        } else if (!agree.checked){
            alert("Please check Terms & Policy to proceed!");
            return false;
        }
    
    }