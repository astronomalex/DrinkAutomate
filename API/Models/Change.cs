using System;

namespace API.Models
{
    public class Change
    {
        public Guid CoinId { get; set; }
        public int Quantity { get; set; }
    }
}