function validateForm()
{
var firstName = document.forms["contact"]["firstName"].value;
var lastName = document.forms["contact"]["lastName"].value;
var email = document.forms["contact"]["email"].value;
var subject = document.forms["contact"]["subject"].value;
var message = document.forms["contact"]["message"].value;
if (firstName == null || firstName == "" ||
    lastName == null || lastName == "" ||
    email == null || email == "" ||
    subject == null || subject == "" ||
    message == null || message == "")
  {
  alert("All fields are required. Please fill in every field.");
  return false;
  }
return true;
}
