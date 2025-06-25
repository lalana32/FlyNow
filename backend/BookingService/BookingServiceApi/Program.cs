using BookingServiceInfrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BookingServiceApplication.Mappings;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // ✅ Dodaj kontrolere
builder.Services.AddEndpointsApiExplorer(); // ✅ Za Swagger
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(BookingProfile)); // ✅ Dodaj Swagger (Swashbuckle)
builder.Services.AddScoped<IBookingService, BookingService>();

// DbContext konfiguracija
builder.Services.AddDbContext<BookingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); // 🛠 ispravljena greška u "Conncetion"

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();        // ✅ Swagger middleware
    app.UseSwaggerUI();      // ✅ Swagger UI
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // ✅ Mapira rute za kontrolere

app.Run();
