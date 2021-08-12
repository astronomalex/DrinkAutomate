using System;

namespace API.Entities
{
    public class Coin
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public bool Active { get; set; }
        public int Quantity { get; set; }
        public int UserBalance { get; set; }
        
    }
}