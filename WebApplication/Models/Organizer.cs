
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{

    public class Organizer : Person
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        //public int Id { get; set; }

        public virtual ICollection<Event> Events { get; set; }

    }
}