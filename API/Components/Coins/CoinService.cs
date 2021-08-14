using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Components.Automate;
using API.Data;
using API.Entities;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Components.Coins
{
    public class CoinService : ICoinService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAutomateService _automateService;

        public CoinService(ApplicationDbContext context, IAutomateService automateService)
        {
            _context = context;
            _automateService = automateService;
        }

        public async Task<int> InsertAsync(int value)
        {
            var coin = await _context.Coins.FirstAsync(c => c.Value == value);
            (await GetCoinById(coin.Id)).UserBalance++;
            await _context.SaveChangesAsync();
            return await GetBalanceAsync();
        }

        private async Task<Coin> GetCoinById(Guid id)
        {
            if (await _context.Coins.AnyAsync(c => c.Id == id))
            {
                return await _context.Coins.Where(c => id == c.Id).SingleAsync();
            }

            throw new Exception("Coin does not exist");
        }

        public async Task<int> GetBalanceAsync()
        {
            return await _context.Coins.SumAsync(c => c.UserBalance * c.Value) + await _automateService.GetBalance();
        }

        public async Task<int> ClearBalanceAsync()
        {
            var result = 0;
            await _context.Coins.ForEachAsync(c =>
            {
                result += c.UserBalance * c.Value;
                c.UserBalance = 0;
            });
            return result;
        }

        public async Task MoveCoinsFromBalanceAsync()
        {
            await _context.Coins.ForEachAsync(c => c.Quantity += c.UserBalance);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Change>> GiveChange(int change)
        {
            var coins = await GetAllCoinsAsync();
            var result = new List<Change>();
            foreach (var coin in coins)
            {
                var count = change / coin.Value;
                if (coin.Quantity < count)
                {
                    count = coin.Quantity;
                }

                change -= count * coin.Value;
                if (count > 0)
                {
                    result.Add(new Change
                    {
                        CoinValue = coin.Value,
                        Quantity = count
                    });
                    coin.Quantity -= count;
                }


                if (change == 0) break;
            }

            if (change > 0)
            {
                await _automateService.SetBalance(await _automateService.GetBalance() + change);
            }

            await _context.SaveChangesAsync();

            return result;
        }

        public async Task<BuyResponseDTO> RetrieveMoney()
        {
            var changeCoins = new List<Change>();
            await _context.Coins.ForEachAsync(c =>
            {
                changeCoins.Add(new Change
                {
                    Quantity = c.UserBalance,
                    CoinValue = c.Value
                });
                c.UserBalance = 0;
            });

            await _context.SaveChangesAsync();

            return new BuyResponseDTO
            {
                Changes = changeCoins
            };
        }

        public async Task<IEnumerable<CoinDTO>> GetCoins()
        {
            var coinDtos = new List<CoinDTO>();
            await _context.Coins.ForEachAsync(c =>
            {
                coinDtos.Add(new CoinDTO
                {
                    Id = c.Id,
                    Value = c.Value,
                    Active = c.Active,
                    Quantity = c.Quantity
                });
            });
            return coinDtos;
        }

        public async Task<int> SaveCoins(IEnumerable<Coin> coins)
        {
            foreach (var coin in coins)
            {
                var coinFromStore = _context.Coins.First(c => c.Id == coin.Id);
                if (coinFromStore != null)
                {
                   coinFromStore.Active = coin.Active; 
                   coinFromStore.Quantity = coin.Quantity; 
                }
            }

            return await _context.SaveChangesAsync();
        }

        private async Task<IEnumerable<Coin>> GetAllCoinsAsync()
        {
            return await _context.Coins.OrderByDescending(c => c.Value).ToListAsync();
        }

        private async Task<int> GetSumOfChangeCoins(IEnumerable<Change> changeCoins)
        {
            return changeCoins.Sum(changeCoin => changeCoin.Quantity * changeCoin.CoinValue);
        }
    }
}