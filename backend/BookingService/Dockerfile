FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

COPY ./BookingServiceApi/BookingServiceApi.csproj ./BookingServiceApi/
COPY ./BookingServiceApplication/BookingServiceApplication.csproj ./BookingServiceApplication/
COPY ./BookingServiceDomain/BookingServiceDomain.csproj ./BookingServiceDomain/
COPY ./BookingServiceInfrastructure/BookingServiceInfrastructure.csproj ./BookingServiceInfrastructure/
# Restore as distinct layers
RUN dotnet restore ./BookingServiceApi/BookingServiceApi.csproj

COPY ./BookingServiceApi/ ./BookingServiceApi/
COPY ./BookingServiceApplication/ ./BookingServiceApplication/
COPY ./BookingServiceDomain/ ./BookingServiceDomain/
COPY ./BookingServiceInfrastructure/ ./BookingServiceInfrastructure/
# Build and publish a release
RUN dotnet publish ./BookingServiceApi/BookingServiceApi.csproj -c Release -o /App/out

WORKDIR /temp
RUN apt-get update && apt-get install -y wget && \
    wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out ./
COPY --from=build /temp/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
ENTRYPOINT ["/wait-for-it.sh", "booking.database:5432", "--", "dotnet", "BookingServiceApi.dll"]