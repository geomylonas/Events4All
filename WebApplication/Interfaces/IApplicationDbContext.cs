using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Event> Events { get; set; }
        DbSet<Ticket> Tickets { get; set; }
        DbSet<Purchase> Purchases { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Picture> Pictures { get; set; }
        DbSet<Customer> Customers { get; set; }
        DbSet<Organizer> Organizers { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
