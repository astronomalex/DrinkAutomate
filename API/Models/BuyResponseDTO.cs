using System.Collections;
using System.Collections.Generic;

namespace API.Models
{
    public class BuyResponseDTO
    {
        public IEnumerable<Change> Changes { get; set; }
    }
}