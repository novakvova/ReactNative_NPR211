@echo off

echo Docker login...
docker login

cd "WebShopApi"

echo Building Docker image api...
docker build -t npr211-asp-api .

echo Tagging Docker image api...
docker tag npr211-asp-api:latest novakvova/npr211-asp-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/npr211-asp-api:latest

echo Done ---api---!
pause

