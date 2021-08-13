using System;

namespace API.Models
{
    public class CoinDTO
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public bool Active { get; set; }
    }
}