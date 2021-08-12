using System.Threading.Tasks;

namespace API.Components.Automate
{
    public interface IAutomateService
    {
        Task SetBalance(int sum);
        Task<int> GetBalance();
    }
}