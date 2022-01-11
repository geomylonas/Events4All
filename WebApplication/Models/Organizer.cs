
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{

    public class Organizer : Person
    {
        public  virtual ICollection<Event> Events { get; set; }

    }
}