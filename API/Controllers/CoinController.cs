using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Components.Coins;
using API.Entities;
using API.Models;
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

        [HttpPut("insert/{value}")]
        public async Task<ActionResult<int>> InsertCoin(int value)
        {
            return Ok(await _coinService.InsertAsync(value));
        }

        [HttpGet("balance")]
        public async Task<ActionResult<int>> GetBalance()
        {
            return Ok(await _coinService.GetBalanceAsync());
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoinDTO>>> GetCoinDtos()
        {
            return Ok(await _coinService.GetCoins());
        }

        [HttpPost("retrieve-money")]
        public async Task<ActionResult<IEnumerable<Change>>> RetrieveMoney()
        {
            return Ok(await _coinService.RetrieveMoney());
        }

        [HttpPost("save")]
        public async Task<ActionResult<int>> SaveAllCoins([FromBody] IEnumerable<Coin> coins)
        {
            return await _coinService.SaveCoins(coins);
        }
    }
}