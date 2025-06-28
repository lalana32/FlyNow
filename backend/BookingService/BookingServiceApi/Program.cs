using BookingServiceInfrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BookingServiceApplication.Mappings;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(BookingProfile));
builder.Services.AddScoped<IBookingService, BookingService>();

builder.Services.AddHttpClient<IFlightLookupService, FlightLookupService>(client =>
{
    client.BaseAddress = new Uri("http://yarp"); 
});

// DbContext konfiguracija
builder.Services.AddDbContext<BookingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); // 🛠 ispravljena greška u "Conncetion"

var app = builder.Build();

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
