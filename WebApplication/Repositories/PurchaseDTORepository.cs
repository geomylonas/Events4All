using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication.Controllers;
using WebApplication.DTO;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class PurchaseDTORepository : GenericRepository<PurchaseDTO>,IPurchaseDTORepository
    {

        public PurchaseDTORepository(IApplicationDbContext context) : base(context)
        {

        }


        //event - purchateDetail -ticketcategory - purchasedate

        public new Task<ICollection<PurchaseDTO>> GetAll()
        {
            var userID = AccountController.GetUserID();
            var person = _context.Set<Person>().Where(o => o.Id == userID).FirstOrDefault();
            PurchaseDTO purchaseDTO;
            ICollection<PurchaseDTO> purchaseDTOs = new Collection<PurchaseDTO>();

            ICollection<Purchase> purchases = person.Purchases;
            foreach(var purchase in purchases)
            {
                
                
                var purchaseDetails=purchase.PurchaseDetails;
                foreach(var purchaseDetail in purchaseDetails)
                {
                    purchaseDTO = new PurchaseDTO();
                    Ticket ticket = _context.Set<Ticket>().Where(t => t.Id == purchaseDetail.TicketId).FirstOrDefault();


                    purchaseDTO.CategoryName = ticket.Category.Name;
                    purchaseDTO.PurchaseDate = purchase.DateOfPurchase;
                    purchaseDTO.TicketQuantity = purchaseDetail.Quantity;
                    purchaseDTO.EventTitle = ticket.Event.Title;
                    purchaseDTO.EventAddress = ticket.Event.PlaceAddress;
                    purchaseDTO.TicketCodes = _context.Set<TicketCode>().Where(tc => (tc.PurchaseDetail.PurchaseId == purchaseDetail.PurchaseId) &&(tc.PurchaseDetail.TicketId==purchaseDetail.TicketId)).Select(tc=>tc.Code).ToList();
                    purchaseDTOs.Add(purchaseDTO);
                }
            }
            return Task.FromResult(purchaseDTOs);
        }
    }
}