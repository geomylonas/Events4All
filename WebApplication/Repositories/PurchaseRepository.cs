using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using DAL.Entities;
using WebApplication.Controllers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data.Entity;

namespace WebApplication.Repositories
{
    public class PurchaseRepository : GenericRepository<Purchase>, IPurchaseRepository
    {
        public PurchaseRepository(IApplicationDbContext context) : base(context)
        {

        }

        public  void Add(Purchase purchase, Random rnd)
        {

            var user = _context.Set<Person>().Find(AccountController.GetUserID());
          
            foreach(var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                if(ticket.Event.AvailableTickets- purchaseDetails.Quantity < 0)
                {
                    throw new Exception("Not enough available tickets for event: "+ticket.Event);
                    return;
                }
            }
            foreach (var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                ticket.Event.AvailableTickets -= purchaseDetails.Quantity;
                purchaseDetails.TicketCodes = TicketCodeGenerator(purchaseDetails, rnd);
            }

            user.Purchases.Add(purchase);
            _context.Set<Purchase>().Add(purchase);
            
        }
        
        public string CheckPurchase(Purchase purchase)
        {
            double totalPrice=0;

            foreach (var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                if (ticket.Event.AvailableTickets - purchaseDetails.Quantity < 0)
                {
                    throw new Exception("Not enough available tickets for event: " + ticket.Event);
                    return "Not enough available tickets for event: " + ticket.Event;
                }
            }

            foreach (var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                totalPrice += (ticket.Price * purchaseDetails.Quantity);
            }

            if (totalPrice != purchase.Amount)
            {
                return "Something went wrong with the purchase";
            }
            else
            {
                foreach (var purchaseDetails in purchase.PurchaseDetails)
                {
                    var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                    //ticket.Event.AvailableTickets -= purchaseDetails.Quantity;
                    Event @event = _context.Set<Event>().Find(ticket.Event.Id);
                    //@event.AvailableTickets -= purchaseDetails.Quantity;
      
                    //_context.Entry(@event).State = EntityState.Modified;

                }
                return "OK";
            }

       




        }

        public Task<ICollection<Purchase>> GetPurchasesByUser()
        {
            var user = _context.Set<Person>().Find(AccountController.GetUserID());
            return Task.FromResult(user.Purchases);
        }


        private ICollection<string> TicketCodeGenerator(PurchaseDetail purchaseDetails, Random rnd)
        {
            ICollection<string> ticketCodes = new List<string>();
            TicketCode ticketCode;
            var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
            string eventID = ticket.Event.Id.ToString();
            string ticketID = ticket.Id.ToString();
           
            for (var i=0;i<purchaseDetails.Quantity;i++)
            {
                string randomID = rnd.Next(1000000, 2000000).ToString();
                ticketCode = new TicketCode { Code = eventID + ticketID + randomID, PurchaseDetail = purchaseDetails };
                ticketCodes.Add(ticketCode.Code);
                _context.Set<TicketCode>().Add(ticketCode);
            }
            
            return ticketCodes;
        }

        public void ReleaseTickets(Purchase purchase)
        {
            foreach (var purchaseDetails in purchase.PurchaseDetails)
            {
                var ticket = _context.Set<Ticket>().Find(purchaseDetails.TicketId);
                Event @event = _context.Set<Event>().Find(ticket.Event.Id);
                //@event.AvailableTickets += purchaseDetails.Quantity;
                //_context.Entry(@event).State = EntityState.Modified;
            }
        }

    }
}