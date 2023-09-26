# poppaBack

### Pasos para levantar el backend en la instancia de AWS EC2

Asignar permisos específicos sobre el fichero PEM que está dentro de la carpeta AWS del repositorio:

    chmod 400 dreamteam-eventum-backend.pem

Conectarse a la instancia EC2 ejecutando el siguiente comando sin salir de la carpeta AWS:

    ssh -i "dreamteam-eventum-backend.pem" ubuntu@ec2-44-201-235-108.compute-1.amazonaws.com

Levantar el backend como un proceso demonio con el siguiente comando:

    pm2 start eventum-back/src/index.js

### Configuración de Nginx

Esta configuración es necesaria para que pueda redireccionar tráfico desde fuera (internet) hacia la aplicación de NodeJS que está ejecutando en el puerto específico.

    ubuntu@ip-172-31-85-100:~$ cat /etc/nginx/sites-available/eventum-back.patgonzalez.me
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }

    server {
        server_name eventum-back.patgonzalez.me;

        location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
        }
    }
