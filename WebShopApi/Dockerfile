# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ["WebShopApi/WebShopApi.csproj", "WebShopApi/"]
RUN dotnet restore "WebShopApi/WebShopApi.csproj"

# copy everything else and build app
COPY . .
WORKDIR /source/WebShopApi
RUN dotnet publish -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    lsb-release \
    && echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -c | awk '{print $2}')-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
    apt-get update && \
    apt-get install -y postgresql-client-17 && \
    apt-get remove -y wget gnupg lsb-release && \
    apt-get clean
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WebShopApi.dll"]
