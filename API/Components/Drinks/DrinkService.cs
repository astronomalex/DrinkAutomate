﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Components.Coins;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Components.Drink
{
    
    public class DrinkService : IDrinksService
    {
        private readonly ApplicationDbContext _context;
        private readonly ICoinService _coinService;

        public DrinkService(ApplicationDbContext context, 
            ICoinService coinService)
        {
            _context = context;
            _coinService = coinService;
        }

        public async Task<DrinkResponseDTO> AddAsync(DrinkAddRequestDTO requestDto)
        {
            var drink = new Entities.Drink
            {
                Name = requestDto.Name,
                Price = requestDto.Price
            };
                
            await _context.Drinks.AddAsync(drink);
            await _context.SaveChangesAsync();
            return new DrinkResponseDTO
            {
                Name = drink.Name,
                Price = drink.Price,
                Picture = drink.Picture,
                Id = drink.Id,
                Quantity = drink.Quantity
            };
        }

        public async Task<ICollection<DrinkResponseDTO>> GetListAsync()
        {
            var drinks = _context.Drinks.ToList();
            var drinksResponseDto = drinks.Select(drink => new DrinkResponseDTO
                {
                    Id = drink.Id,
                    Name = drink.Name,
                    Price = drink.Price,
                    Quantity = drink.Quantity,
                    Picture = drink.Picture
                })
                .ToList();
            return drinksResponseDto;
        }

        public async Task<DrinkResponseDTO> EditAsync(DrinkAddRequestDTO drinkAddRequestDto, IFormFile picture)
        {
           
            var drink = _context.Drinks.FirstOrDefault(d => d.Id == drinkAddRequestDto.Id);
            if (picture != null)
            {
                await using var ms = new MemoryStream();
                await picture.CopyToAsync(ms);
                drink.Picture = ms.ToArray();
            }
            drink.Name = drinkAddRequestDto.Name;
            drink.Price = drinkAddRequestDto.Price;
            drink.Quantity = drinkAddRequestDto.Quantity;
            
            await _context.SaveChangesAsync();
            return new DrinkResponseDTO
            {
                Name = drink.Name,
                Price = drink.Price,
                Picture = drink.Picture,
                Id = drink.Id,
                Quantity = drink.Quantity
            };
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            var drink = _context.Drinks.FirstOrDefault(d => d.Id == id);
            if (drink == null)
            {
                return 0;
            }
            _context.Drinks.Remove(drink);
            await _context.SaveChangesAsync();
            return 1;
        }

        public async Task<IEnumerable<Change>> BuyDrinkAsync(Guid id)
        {
            var drink = await GetDrinkById(id);
            var balance = await _coinService.GetBalanceAsync();
            if (balance < drink.Price)
            {
                throw new Exception("Not enough money");
            }
            if (drink.Quantity <= 0)
            {
                throw new Exception("The drink is over");
            }

            var change = balance - drink.Price;
            await _coinService.MoveCoinsFromBalanceAsync();
            var moneyFromCoins= await _coinService.ClearBalanceAsync();
            var moneyFromBalance = balance - moneyFromCoins;
            _context.Automate.First(a => a.Id != null).Balance -= moneyFromBalance;
            
            GiveOutDrink(drink);
            var changes = await _coinService.GiveChange(change);
            await _context.SaveChangesAsync();
            return changes;
        }
        
        private async Task<Entities.Drink> GetDrinkById(Guid id)
        {
            if (await _context.Drinks.AnyAsync(c => c.Id == id))
            {
                return await _context.Drinks.Where(c => id == c.Id).SingleAsync();
            }

            throw new Exception("Drink does not exist");
        }

        private async Task GiveOutDrink(Entities.Drink drink)
        {
            drink.Quantity--;
        }

    }
}