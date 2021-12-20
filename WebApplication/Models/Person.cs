using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public abstract class Person: ApplicationUser
    {
        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }


        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }


        //[Required]
        //[MaxLength(30)]
        //[Index(IsUnique = true)]
        //public string Email { get; set; }


        [MaxLength(20)]
        public string Mobile { get; set; }
    }
}