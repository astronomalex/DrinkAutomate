using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Models;

namespace API.Components.Coins
{
    public interface ICoinService
    {
        Task<int> InsertAsync(Guid id);
        Task<int> GetBalanceAsync();
        Task<int> ClearBalanceAsync();
        Task MoveCoinsFromBalanceAsync();
        Task<IEnumerable<Change>> GiveChange(int change);
        Task<BuyResponseDTO> RetrieveMoney();
    }
}