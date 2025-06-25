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

WORKDIR /temp
RUN apt-get update && apt-get install -y wget && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App

COPY --from=build /App/out ./
COPY --from=build /temp/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

ENTRYPOINT ["/wait-for-it.sh", "postgres:5432", "--", "dotnet", "FlightServiceApi.dll"]
