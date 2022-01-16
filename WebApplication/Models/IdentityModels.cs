using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using DAL.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using WebApplication.Interfaces;

namespace WebApplication.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

 

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>,IApplicationDbContext
    {
        
        public ApplicationDbContext()
            : base("Events4AllModelConString", throwIfV1Schema: false)
        {
        }

        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<Purchase> Purchases { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Organizer> Organizers { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
 
        public virtual DbSet<PurchaseDetail> PurchaseDetails { get; set; }

        public virtual DbSet<EventCategory> EventCategories { get; set; }

        public virtual DbSet<TicketCode> TicketCodes { get; set; }





        // Your context has been configured to use a 'Model1' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'GroupProject.Model1' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Model1' 
        // connection string in the application configuration file


        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}