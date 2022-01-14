using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using DAL.Entities;
using WebApplication.Controllers;
using System.Threading.Tasks;

namespace WebApplication.Repositories
{
    public class PurchaseRepository : GenericRepository<Purchase>, IPurchaseRepository
    {
        public PurchaseRepository(IApplicationDbContext context) : base(context)
        {

        }

        public new void Add(Purchase purchase)
        {

            var user = _context.Set<Person>().Find(AccountController.GetUserID());
            user.Purchases.Add(purchase);
            _context.Set<Purchase>().Add(purchase);
            foreach(var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                ticket.Event.AvailableTickets -= purchaseDetails.Quantity;
            }
        }

        public Task<ICollection<Purchase>> GetPurchasesByUser()
        {
            var user = _context.Set<Person>().Find(AccountController.GetUserID());
            return Task.FromResult(user.Purchases);
        }




    }
}