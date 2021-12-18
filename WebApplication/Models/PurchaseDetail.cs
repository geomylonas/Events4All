using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication.Models 
{ 

    public class PurchaseDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999.99)]
        public decimal TotalPrice { get; set; }
        [Required]
        public int Quantity { get; set; }
        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}