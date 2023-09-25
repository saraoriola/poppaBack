# poppaBack

Para conectarse a la instancia de EC2, dentro de la carpeta AWS ejecutar:

    ssh -i "dreamteam-eventum-backend.pem" ubuntu@ec2-44-201-235-108.compute-1.amazonaws.com

Ejecutar el backend como un proceso demonio con el siguiente comando:

    pm2 start eventum-back/src/index.js
