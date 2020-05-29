<?php
  //salvo in variabili i dati da passare a mysqli per la connessione al database
  $server = 'localhost';
  $username = 'root';
  $password = 'root';
  $dbName = 'HotelDB';

  $id = $_POST["id"];

  //uso l'oggetto $mysqli con i dati di connessione per connettermi
  $conn = new mysqli($server, $username, $password, $dbName);

  //controllo di non aver fatto errori nel prendere dati
  if ($conn -> connect_errno){
    echo $conn -> connect_errno;
    return;

  }

  //scrivo la query da passare al database
  $sql = "
        DELETE FROM paganti
        WHERE id = " . $id
        ;

  //la passo al database
  $conn -> query($sql);
  $conn -> close();
 ?>
