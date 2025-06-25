FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

COPY ./FlightServiceApi/FlightServiceApi.csproj ./FlightServiceApi/
COPY ./FlightServiceApplication/FlightServiceApplication.csproj ./FlightServiceApplication/
COPY ./FlightServiceDomain/FlightServiceDomain.csproj ./FlightServiceDomain/
COPY ./FlightServiceInfrastructure/FlightServiceInfrastructure.csproj ./FlightServiceInfrastructure/

RUN dotnet restore ./FlightServiceApi/FlightServiceApi.csproj

COPY ./FlightServiceApi/ ./FlightServiceApi/
COPY ./FlightServiceApplication/ ./FlightServiceApplication/
COPY ./FlightServiceDomain/ ./FlightServiceDomain/
COPY ./FlightServiceInfrastructure/ ./FlightServiceInfrastructure/

RUN dotnet publish ./FlightServiceApi/FlightServiceApi.csproj -c Release -o /App/out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App

COPY --from=build /App/out ./

ENTRYPOINT ["dotnet", "FlightServiceApi.dll"]
