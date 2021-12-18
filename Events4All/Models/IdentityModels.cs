using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Events4All.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
       
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }


        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }


        [MaxLength(20)]
        public string Mobile { get; set; }


        [Required]
        public DateTime DateOfBirth { get; set; }


        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }




    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
       
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<Purchase> Purchases { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }


        //internal static void RelateFluent(System.Data.Entity.DbModelBuilder builder)
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Primary keys
            builder.Entity<Purchase>().HasKey(q => q.Id);
            builder.Entity<Ticket>().HasKey(q => q.Id);
            builder.Entity<PurchaseDetail>().HasKey(q =>
                new {
                    q.TicketId,
                    q.PurchaseId
                });

            // Relationships
            builder.Entity<PurchaseDetail>()
                .HasRequired(q => q.Purchase)
                .WithMany(q => q.PurchaseDetails)
                .HasForeignKey(q => q.PurchaseId);

            builder.Entity<PurchaseDetail>()
                .HasRequired(q => q.Ticket)
                .WithMany(q => q.PurchaseDetails)
                .HasForeignKey(q => q.TicketId);





            builder.Entity<Ticket>().HasKey(q => q.Id);
            builder.Entity<Category>().HasKey(q => q.Id);
            builder.Entity<TicketCategory>().HasKey(q =>
                new {
                    q.CategoryId,
                    q.TicketId
                });

            // Relationships
            builder.Entity<TicketCategory>()
                .HasRequired(q => q.Ticket)
                .WithMany(q => q.TicketCategories)
                .HasForeignKey(q => q.TicketId);

            builder.Entity<TicketCategory>()
                .HasRequired(q => q.Category)
                .WithMany(q => q.TicketCategories)
                .HasForeignKey(q => q.CategoryId);
        }
        // Your context has been configured to use a 'Model1' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'GroupProject.Model1' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Model1' 
        // connection string in the application configuration file


       





        public ApplicationDbContext()
            : base("EventDbString", throwIfV1Schema: false)
        {


        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public System.Data.Entity.DbSet<Events4All.Models.ApplicationUser> ApplicationUsers { get; set; }
    }
}