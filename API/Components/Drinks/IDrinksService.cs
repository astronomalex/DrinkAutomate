using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;

namespace API.Components.Drink
{
    public interface IDrinksService
    {
        Task<DrinkResponseDTO> AddAsync(DrinkAddRequestDTO requestDto);
        Task<ICollection<DrinkResponseDTO>> GetListAsync();
        Task<DrinkResponseDTO> EditAsync(DrinkAddRequestDTO drinkDto, IFormFile picture);
        Task<int> DeleteAsync(Guid id);
        Task<IEnumerable<Change>> BuyDrinkAsync(Guid id);
    }
}