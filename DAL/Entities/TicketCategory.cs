using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DAL.Entities
{ 
    public class TicketCategory
    {
    //    [Key]
    //    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //    public int Id { get; set; }

        

       
        [Key, Column(Order = 0)]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Key, Column(Order = 1)]
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }


        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999.99)]
        [Required]
        public decimal Price { get; set; }
    }
}