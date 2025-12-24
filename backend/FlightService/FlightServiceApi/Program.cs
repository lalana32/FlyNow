using System.Text;
using Microsoft.OpenApi.Models;
using FlightServiceApplication.Services;
using FlightServiceApplication.Interfaces;
using FlightServiceInfrastructure.Interfaces;
using FlightServiceInfrastructure.Services;
using FlightServiceApplication.Mappings;
using AutoMapper;
using DotNetEnv;




var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient<IFlightApiClient, FlightApiClient>();
builder.Services.AddHttpClient<ITokenService, TokenService>();
builder.Services.AddScoped<IFlightService, FlightService>();
builder.Services.AddScoped<IFlightLocationService, FlightLocationService>();
builder.Services.AddScoped<IFlightLocationAppService, FlightLocationAppService>();

builder.Services.AddAutoMapper(typeof(FlightProfile));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty; 
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", () => Results.Ok("Healthy"));

app.UseCors("AllowFrontend");

app.Run();
