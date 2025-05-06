
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

COPY ./EmailServiceApi/EmailServiceApi.csproj ./EmailServiceApi/
COPY ./EmailServiceApplication/EmailServiceApplication.csproj ./EmailServiceApplication/
COPY ./EmailServiceDomain/EmailServiceDomain.csproj ./EmailServiceDomain/
COPY ./EmailServiceInfrastructure/EmailServiceInfrastructure.csproj ./EmailServiceInfrastructure/


RUN dotnet restore ./EmailServiceApi/EmailServiceApi.csproj


COPY ./EmailServiceApi/ ./EmailServiceApi/
COPY ./EmailServiceApplication/ ./EmailServiceApplication/
COPY ./EmailServiceDomain/ ./EmailServiceDomain/
COPY ./EmailServiceInfrastructure/ ./EmailServiceInfrastructure/


RUN dotnet publish ./EmailServiceApi/EmailServiceApi.csproj -c Release -o /App/out


FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App

COPY --from=build /App/out ./

ENTRYPOINT ["dotnet", "EmailServiceApi.dll"]
