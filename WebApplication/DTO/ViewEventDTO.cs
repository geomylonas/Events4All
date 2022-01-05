using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.DTO
{
    public class ViewEventDTO
    {
        public Event Event { get; set; }
        
        public ICollection<Picture> Pictures { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
      
    }
}