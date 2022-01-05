using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DAL.Entities
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        [MaxLength(30)]
        public string PlaceName { get; set; }

        [Required]
        [MaxLength(50)]
        public string PlaceAddress { get; set; }

        
        public DateTime DateOfEvent { get; set; }

        
        public int MaxTickets { get; set; }

       
        public virtual ICollection<Ticket> Tickets { get; set; }
        public virtual ICollection<Picture> Pictures { get; set; }

    }
}