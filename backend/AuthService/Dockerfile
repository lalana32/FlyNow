FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

# Kopiranje .csproj fajlova pojedinačno
COPY ./AuthServiceApi/AuthServiceApi.csproj ./AuthServiceApi/
COPY ./AuthServiceApplication/AuthServiceApplication.csproj ./AuthServiceApplication/
COPY ./AuthServiceDomain/AuthServiceDomain.csproj ./AuthServiceDomain/
COPY ./AuthServiceInfrastructure/AuthServiceInfrastructure.csproj ./AuthServiceInfrastructure/

# Restore samo glavnog projekta (on povlači sve dependencies)
RUN dotnet restore ./AuthServiceApi/AuthServiceApi.csproj

# Kopiranje celog koda
COPY ./AuthServiceApi/ ./AuthServiceApi/
COPY ./AuthServiceApplication/ ./AuthServiceApplication/
COPY ./AuthServiceDomain/ ./AuthServiceDomain/
COPY ./AuthServiceInfrastructure/ ./AuthServiceInfrastructure/

# Publish
RUN dotnet publish ./AuthServiceApi/AuthServiceApi.csproj -c Release -o /App/out

# Preuzimanje wait-for-it skripte
WORKDIR /temp
RUN apt-get update && apt-get install -y wget && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App

COPY --from=build /App/out ./
COPY --from=build /temp/wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

# Pretpostavka: auth.database koristi port 5432
ENTRYPOINT ["/wait-for-it.sh", "auth.database:5432", "--", "dotnet", "AuthServiceApi.dll"]
