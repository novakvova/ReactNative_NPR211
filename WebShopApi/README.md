# npr211-asp

Create docker hub repository - publish
```
docker build -t npr211-asp-api . 
docker run -it --rm -p 4985:8080 --name npr211-asp_container npr211-asp-api
docker run -d --restart=always --name npr211-asp_container -p 4985:8080 npr211-asp-api
docker run -d --restart=always -v d:/volumes/npr211-asp/images:/app/uploading --name npr211-asp_container -p 4985:8080 npr211-asp-api
docker run -d --restart=always -v /volumes/npr211-asp/images:/app/uploading --name npr211-asp_container -p 4985:8080 npr211-asp-api
docker ps -a
docker stop npr211-asp_container
docker rm npr211-asp_container

docker images --all
docker rmi npr211-asp-api

docker login
docker tag npr211-asp-api:latest novakvova/npr211-asp-api:latest
docker push novakvova/npr211-asp-api:latest

docker pull novakvova/npr211-asp-api:latest
docker ps -a
docker run -d --restart=always --name npr211-asp_container -p 4985:8080 novakvova/npr211-asp-api

docker run -d --restart=always -v /volumes/npr211-asp/images:/app/uploading --name npr211-asp_container -p 4985:8080 novakvova/npr211-asp-api


docker pull novakvova/npr211-asp-api:latest
docker images --all
docker ps -a
docker stop npr211-asp_container
docker rm npr211-asp_container
docker run -d --restart=always --name npr211-asp_container -p 4985:8080 novakvova/npr211-asp-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   npr211api.itstep.click *.npr211api.itstep.click;
    client_max_body_size 200M;
    location / {
       proxy_pass         http://localhost:4985;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
    location /hub {
        proxy_pass http://localhost:4985; # Replace with your SignalR server address
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Optional headers for better handling of websockets
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Increase buffer and timeout settings
        proxy_buffering off;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
        proxy_connect_timeout 60s;
    }
}


sudo systemctl restart nginx
certbot
```
