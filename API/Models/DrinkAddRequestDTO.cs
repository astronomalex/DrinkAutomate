using System;

namespace API.Models
{
    public class DrinkAddRequestDTO
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}