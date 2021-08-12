using System;
using System.Threading.Tasks;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Components.Automate
{
    public class AutomateService : IAutomateService
    {
        private readonly ApplicationDbContext _context;

        public AutomateService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SetBalance(int sum)
        {
            (await GetAutomateState()).Balance = sum;
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetBalance()
        {
            var automate = await GetAutomateState();
            return automate.Balance;
        }

        private async Task<Entities.Automate> GetAutomateState()
        {
            var automate = await _context.Automate.FirstAsync(a => a != null);
            if (automate != null)
            {
                return automate;
            }

            throw new Exception("Automate is not exist");
        }
    }
}