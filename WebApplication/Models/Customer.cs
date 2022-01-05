
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Customer : Person
    {
        
        [Required]
        public DateTime DateOfBirth { get; set; }

        public  ICollection<Purchase> Purchases { get; set; }
    }
}