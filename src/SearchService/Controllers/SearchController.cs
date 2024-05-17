using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Entities;
using SearchService.RequestHelpers;

namespace SearchService.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> SearchItems([FromQuery]SearchParams searchParams)
        {
            var query = DB.PagedSearch<Item, Item>();

            if(!string.IsNullOrEmpty(searchParams.searchTerm))
            {
                query.Match(Search.Full, searchParams.searchTerm).SortByTextScore();
            }

            query = searchParams.FilterBy switch
            {
                "finished" => query.Match(i => i.AuctionEnd < DateTime.UtcNow),
                "endingSoon" => query.Match(i => i.AuctionEnd < DateTime.UtcNow.AddHours(6) && i.AuctionEnd > DateTime.UtcNow),
                _ => query.Match(i => i.AuctionEnd > DateTime.UtcNow)
            };

            if(!string.IsNullOrEmpty(searchParams.Seller))
            {
                query.Match(i => i.Seller == searchParams.Seller);
            }

            if(!string.IsNullOrEmpty(searchParams.Winner))
            {
                query.Match(i => i.Winner == searchParams.Winner);
            }

            query =  searchParams.OrderBy switch
            {
                "make" => query.Sort(i => i.Ascending( a => a.Make)),
                "new" => query.Sort(i => i.Descending( a => a.CreatedAt)),
                _ => query.Sort(i => i.Ascending(a => a.AuctionEnd))
            };

            query.PageNumber(searchParams.PageNumber);
            query.PageSize(searchParams.PageSize);

            var result = await query.ExecuteAsync();

            return Ok(new 
            { 
                results = result.Results,
                pageCount = result.PageCount,
                totalCount = result.TotalCount
            });
        }
    }
}