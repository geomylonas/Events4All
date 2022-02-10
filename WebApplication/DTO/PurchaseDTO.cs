using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.DTO
{
    public class PurchaseDTO
    {
        public string EventTitle{ get;set; } //title //place address
        public string EventAddress { get; set; }
        public int EventId { get; set; }
        public int TicketQuantity { get; set; } //quantity       
        public string CategoryName { get; set; }  //name
        public DateTime PurchaseDate { get; set; } 
        public ICollection<string> TicketCodes { get; set; }
    }
}