<?php
function spamcheck($field){
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL)){
       return TRUE;
  }else{
       return FALSE;
  }
}
if (isset($_REQUEST['email'])){

  //check if the email address is invalid
  $mailcheck = spamcheck($_REQUEST['email']);
  if ($mailcheck==FALSE){
    echo "Invalid input";
  }else{//send email
    $to = "info@aurora-es.com";
    $from = "From: $_REQUEST[firstName] $_REQUEST[lastName] <$_REQUEST[email]>";
    $subject = $_REQUEST['subject'];
    $message = $_REQUEST['message'];
    mail($to,$subject,$message,$from);
    echo"Thank you for contacting Aurora Engineering Solutions! We will respond to your inquiry as soon as possible.";
  }
}
?>
