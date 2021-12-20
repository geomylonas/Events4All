using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{ 
    public class TicketCategory
    {
        public TicketCategory() { }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }


        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999.99)]
        [Required]
        public decimal Price { get; set; }
    }
}