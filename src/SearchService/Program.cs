using Polly;
using Polly.Extensions.Http;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async () =>
{
    try
    {
        await DbIntializer.InitDb(app);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
});

app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy() 
    => HttpPolicyExtensions.HandleTransientHttpError().OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound).WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));