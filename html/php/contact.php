<?php session_start(); ?>

<?php
//log file location
$log = "/var/chroot/home/content/79/11933979/logs/contactUs.log";

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
  include_once $_SERVER['DOCUMENT_ROOT'] . '/securimage/securimage.php';
  $securimage = new Securimage();
  if ($mailcheck==FALSE){
    echo "Invalid email address. Please enter a valid email address.";
  } elseif($securimage->check($_REQUEST['captchaCode']) == false){
    echo "The security code was incorrect. Please go back re-enter security code.";
  } else{//send email
    $to = "info@aurora-es.com";
    $name = $_REQUEST['firstName'] . " " . $_REQUEST['lastName'];
    $from = "From: $name <$_REQUEST[email]>";
    $subject = "[WEBSITE INQUIRY] $_REQUEST[subject]";
    $message = $_REQUEST['message'];
    mail($to,$subject,$message,$from);
    //open and write to log
    $fh = fopen($log,"a");
    $dateTime = gmdate("Y-m-d H:i:s");
    fwrite($fh, "$dateTime - Email sent $from;$subject\n");
    fclose($fh);
    //return thank you message to user.
    echo"Thank you for contacting Aurora Engineering Solutions! We will respond to your inquiry as soon as possible.";
  }
}
?>
