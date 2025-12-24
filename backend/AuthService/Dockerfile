FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

COPY ./AuthServiceApi/AuthServiceApi.csproj ./AuthServiceApi/
COPY ./AuthServiceApplication/AuthServiceApplication.csproj ./AuthServiceApplication/
COPY ./AuthServiceDomain/AuthServiceDomain.csproj ./AuthServiceDomain/
COPY ./AuthServiceInfrastructure/AuthServiceInfrastructure.csproj ./AuthServiceInfrastructure/

RUN dotnet restore ./AuthServiceApi/AuthServiceApi.csproj

COPY ./AuthServiceApi/ ./AuthServiceApi/
COPY ./AuthServiceApplication/ ./AuthServiceApplication/
COPY ./AuthServiceDomain/ ./AuthServiceDomain/
COPY ./AuthServiceInfrastructure/ ./AuthServiceInfrastructure/

RUN dotnet publish ./AuthServiceApi/AuthServiceApi.csproj -c Release -o /App/out

WORKDIR /temp
RUN apt-get update && apt-get install -y wget && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App

COPY --from=build /App/out ./
COPY --from=build /temp/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

ENTRYPOINT ["/wait-for-it.sh", "auth.database:5432", "--", "dotnet", "AuthServiceApi.dll"]
