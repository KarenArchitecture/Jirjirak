FROM mcr.microsoft.com/dotnet/sdk:10.0 AS development
WORKDIR /workspace
COPY . .
EXPOSE 8080
CMD ["dotnet", "watch", "--project", "src/Jirjirak.Api/Jirjirak.Api.csproj", "run", "--urls", "http://0.0.0.0:8080"]

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/Jirjirak.Domain/Jirjirak.Domain.csproj", "src/Jirjirak.Domain/"]
COPY ["src/Jirjirak.Application/Jirjirak.Application.csproj", "src/Jirjirak.Application/"]
COPY ["src/Jirjirak.Infrastructure/Jirjirak.Infrastructure.csproj", "src/Jirjirak.Infrastructure/"]
COPY ["src/Jirjirak.Api/Jirjirak.Api.csproj", "src/Jirjirak.Api/"]

RUN dotnet restore "src/Jirjirak.Api/Jirjirak.Api.csproj"
COPY . .
RUN dotnet publish "src/Jirjirak.Api/Jirjirak.Api.csproj" \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS production
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Jirjirak.Api.dll"]
