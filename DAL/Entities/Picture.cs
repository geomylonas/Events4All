using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DAL.Entities
{ 
    public class Picture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        [Index(IsUnique =true)]
        public string Url { get; set; }
        [JsonIgnore]
        public virtual Event Event { get; set; }

        public override bool Equals(object obj)
        {
            return obj is Picture picture &&
                   Id == picture.Id;
        }
    }
}