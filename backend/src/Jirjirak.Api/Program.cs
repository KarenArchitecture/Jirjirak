using Jirjirak.Application;
using Jirjirak.Infrastructure;
using Jirjirak.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/api/health", async Task<IResult> (AppDbContext db, CancellationToken cancellationToken) =>
{
    try
    {
        var databaseIsAvailable = await db.Database.CanConnectAsync(cancellationToken);

        if (!databaseIsAvailable)
        {
            return Results.Problem(
                title: "Service unavailable",
                detail: "The API is running, but PostgreSQL is not reachable.",
                statusCode: StatusCodes.Status503ServiceUnavailable);
        }

        return Results.Ok(new
        {
            status = "Healthy",
            service = "Jirjirak.Api",
            database = "Connected"
        });
    }
    catch (Exception)
    {
        return Results.Problem(
            title: "Service unavailable",
            detail: "The API is running, but PostgreSQL is not reachable.",
            statusCode: StatusCodes.Status503ServiceUnavailable);
    }
})
.WithName("Health");

app.Run();
