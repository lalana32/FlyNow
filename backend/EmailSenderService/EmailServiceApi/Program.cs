using System.Text;
using EmailServiceApplication.Interfaces;
using EmailServiceInfrastructure.Services;
using EmailServiceInfrastructure.Messaging;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IEmailService, EmailService>();
builder.Services.AddSingleton<RabbitMqService>();

builder.Services.AddHostedService<RabbitMqListenerService>();


builder.Services.AddControllers();

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

app.Run();
