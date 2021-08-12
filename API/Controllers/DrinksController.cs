using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Components.Drink;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class DrinksController : ControllerBase
    {
        private readonly IDrinksService _drinksService;

        public DrinksController(IDrinksService drinksService)
        {
            _drinksService = drinksService;
        }
        
        [HttpPost]
        public async Task<ActionResult<DrinkResponseDTO>> Add(DrinkAddRequestDTO requestDto, IFormFile picture)
        {
            return Ok(await _drinksService.AddAsync(requestDto, picture));
        }
        
        [HttpPost("buy")]
        public async Task<ActionResult<IEnumerable<BuyResponseDTO>>> BuyDrink(Guid id)
        {
            return Ok(await _drinksService.BuyDrinkAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<DrinkResponseDTO>>> GetList()
        {
            var drinksResponseDto = await _drinksService.GetListAsync();
            return Ok(drinksResponseDto);
        }

        [HttpPut]
        public async Task<ActionResult<DrinkResponseDTO>> Update(DrinkAddRequestDTO requestDto, IFormFile picture)
        {
            return Ok(await _drinksService.EditAsync(requestDto, picture));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Guid id)
        {
            var result = await _drinksService.DeleteAsync(id);
            if (result == 1) return Ok();
            return BadRequest();
        }
    }
}