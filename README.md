Install choco run Power Shell admin

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Перевіряємо версію Nodejs і ставимо openjdk17

```
node -v
java --version
choco install -y nodejs-lts microsoft-openjdk17
node -v
java --version
```