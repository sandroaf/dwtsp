<?php
   $fone = rawurlencode($_GET['phone']);
   $texto =  rawurlencode($_GET['text']);
   //echo $_SERVER['HTTP_USER_AGENT'];
   if ($fone != '') {
    


    // Fix Api Whatsapp on Desktops
    // Dev: Jean Livino
    $iphone = strpos($_SERVER['HTTP_USER_AGENT'],"iPhone");
    $android = strpos($_SERVER['HTTP_USER_AGENT'],"Android");
    $palmpre = strpos($_SERVER['HTTP_USER_AGENT'],"webOS");
    $berry = strpos($_SERVER['HTTP_USER_AGENT'],"BlackBerry");
    $ipod = strpos($_SERVER['HTTP_USER_AGENT'],"iPod");

   /*
    // check if is a mobile
    if ($iphone || $android || $palmpre || $ipod || $berry == true)
    {
      header('Location: https://api.whatsapp.com/send?phone='.$fone.'&text='.$texto);
    }

    // all others
    else {
      header('Location: https://web.whatsapp.com/send?phone='.$fone.'&text='.$texto);
    }
    */
    header('Location: https://api.whatsapp.com/send?phone='.$fone.'&text='.$texto);
   }
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área Local - Contato WhatsApp - Link</title>
    <style type="text/css">
        input {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }

        * {

            box-sizing: border-box;
        }

        body {
            background-color: #999;
        }

        input[type=text], select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: vertical;
            font-size: 20px;
        }

        label {
            padding: 12px 12px 12px 0px;
            display: inline-block;
            width: 100%;
            text-align: left;
            font-size: 20px;
        }

        input[type=submit] {
            background-color: #4CAF50;
            color: white;
            margin-top: 12px;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 20px;
        }

        input[type=submit]:hover {
            background-color: #45a049;
        }

        input[type=reset] {
            background-color: #f44336;
            color: white;
            margin-top: 12px;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 20px;
        }

        input[type=reset]:hover {
            background-color: #ab3f33;
        }

        .center {
            margin: auto;
            width: 50%;
            padding: 10px;
        }

        .container {
            border-radius: 5px;
            background-color: #f2f2f2;
            padding: 20px;
            width: 100%;
            align: center;
        }

        .col-20 {
            float: left;
            width: 20%;
            margin-top: 6px;
        }

        .col-80 {
            float: right;
            width: 80%;
            margin-top: 6px;
        }

        .row-botton {
            margin-top:12px;
        }

        /* Clear floats after the columns */
        .row:after, .row-botton:after {
            content: "";
            display: table;
            clear: both;
        }


        /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
        @media screen and (max-width: 1440px) {
            .col-20, .col-80, input[type=submit], input[type=reset] {
                width: 100%;
                margin-top: 0;
            }
         }

        img.displayed {
            display: block;
            margin-left: auto;
            margin-right: auto; 
        }

        h3 {
            text-align: center;
            font-family: verdana;
            text-decoration: 
        }

    </style>
  </head>
  <body>
     <div class="container center" id="conteudo">  
        <div class="row">
           <img  class="displayed" src="https://www.arealocal.com.br/wp-content/uploads/2016/01/logo.png" alt="Área Local">
        </div>
        <div class="row">
             <h3>ENVIAR MENSAGEM PELO WHATSAPP</h3> 
        </div>    
        <form action="https://www.arealocal.com.br/areacomercial/whats" method="get" accept-charset="utf-8">
        <div class="row">
            <div class="col-20">
               <label for="phone">Telefone</label>
            </div>
            <div class="col-80">
               <input type="text" name="phone" placeholder="formato: 5547999991234">
            </div>
        </div>
        <div class="row">
            <div class="col-20">
               <label for="text">Mensagem</label>
            </div>
            <div class="col-80">
               <input type="text" name="text" />
            </div>   
        </div>
        <div class="row-botton">  
            <input type="submit" value="Enviar" />
        </div>
        <div class="row-botton">  
            <input type="reset" value="Limpar" />
        </div>    
        </form>
    </div>    
  </body>
</html>
