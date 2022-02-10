
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Interfaces
{
    public interface IPurchaseRepository : IGenericRepository<Purchase>
    {
        Task<ICollection<Purchase>> GetPurchasesByUser();
        string CheckPurchase(Purchase purchase);
        void Add(Purchase purchase, Random rnd);
        void ReleaseTickets(Purchase purchase);
    }
}