using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;

namespace API.Components.Drink
{
    public interface IDrinksService
    {
        Task<DrinkResponseDTO> AddAsync(DrinkAddRequestDTO requestDto, IFormFile picture);
        Task<ICollection<DrinkResponseDTO>> GetListAsync();
        Task<DrinkResponseDTO> EditAsync(DrinkAddRequestDTO drinkDto, IFormFile picture);
        Task<int> DeleteAsync(Guid id);
        Task<BuyResponseDTO> BuyDrinkAsync(Guid id);
    }
}