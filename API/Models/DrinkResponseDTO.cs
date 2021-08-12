using System;

namespace API.Models
{
    public class DrinkResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public byte[] Picture { get; set; }
        public int Quantity { get; set; }
    }
}