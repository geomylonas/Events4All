using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DAL.Entities
{ 
    public class Ticket
    {
       
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Event Event { get; set; }
        public ICollection<TicketCategory> TicketCategories { get; set; }
        public ICollection<PurchaseDetail> PurchaseDetails { get; set; }


        public Ticket() { }


    }
}