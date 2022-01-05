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
        

        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999.99)]
        public decimal Price { get; set; }

        public virtual Event Event { get; set; }
        public ICollection<PurchaseDetail> PurchaseDetails { get; set; }

        public virtual Category Category { get; set; }
        public Ticket() { }


    }
}