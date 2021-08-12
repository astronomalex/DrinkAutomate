using System;
using System.Threading.Tasks;
using API.Components.Coins;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class CoinController : ControllerBase
    {
        private readonly ICoinService _coinService;

        public CoinController(ICoinService coinService)
        {
            _coinService = coinService;
        }
        
        [HttpPut]
        public async Task<ActionResult<int>> InsertCoin(Guid id)
        {
            return Ok(await _coinService.InsertAsync(id));
        }
        
        [HttpGet]
        public async Task<ActionResult<int>> GetBalance()
        {
            return Ok(await _coinService.GetBalanceAsync());
        }
    }
}