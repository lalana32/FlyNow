using BookingServiceInfrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BookingServiceApplication.Mappings;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.Services;
using BookingServiceInfrastructure.Messaging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(BookingProfile));
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IRabbitMqService, RabbitMqService>();

builder.Services.AddHttpClient<IUserLookupService, UserLookupService>(client =>
{
    client.BaseAddress = new Uri("http://yarp/auth-api");
});

builder.Services.AddHttpClient<IFlightLookupService, FlightLookupService>(client =>
{
    client.BaseAddress = new Uri("http://yarp/flight-api"); 
});

builder.Services.AddDbContext<BookingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    
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

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", () => Results.Ok("Healthy")); 

app.Run();
