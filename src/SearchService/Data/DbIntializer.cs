using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Entities;
using SearchService.Services;

namespace SearchService.Data
{
    public class DbIntializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync("SearchDb", MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

            await DB.Index<Item>().Key(k => k.Make, KeyType.Text).Key(k => k.Model, KeyType.Text).Key(k => k.Color, KeyType.Text).CreateAsync();

            var count = await DB.CountAsync<Item>();

            using var scope = app.Services.CreateScope();

            var httpClient = scope.ServiceProvider.GetService<AuctionSvcHttpClient>();

            var items = await httpClient.GetItemsForSearchDb();

            Console.WriteLine(items.Count + " return from the auction service");

            if(items.Count > 0) await DB.SaveAsync(items);
        }
    }
}