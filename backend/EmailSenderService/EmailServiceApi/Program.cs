using System.Text;
using EmailServiceApplication.Interfaces;
using EmailServiceApplication.Services;
using EmailServiceInfrastructure.Messaging;


var builder = WebApplication.CreateBuilder(args);

// -------------------- KONFIGURACIJA SERVISA --------------------

// Swagger (OpenAPI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Tvoje custom servise

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddHostedService<RabbitMqListenerService>();


builder.Services.AddControllers();

var app = builder.Build();

// -------------------- AUTOMATSKE MIGRACIJE I SEEDING --------------------


// -------------------- MIDDLEWARE --------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty; // Swagger UI na root-u
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
