# build .net project
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet restore --packages ./TestApi1.csproj
RUN dotnet publish -c Release -o out

# build react project
FROM node:13.12.0-alpine AS react-app
WORKDIR /app

COPY ./web/package.json ./
COPY ./web/package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./web ./

RUN npm run build

# build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=react-app /app/build ./web/build
ENTRYPOINT ["dotnet", "Server.dll"]