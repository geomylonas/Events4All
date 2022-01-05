using DAL.Entities;
using System;
using System.Data.Entity;
using System.Linq;

namespace DAL
{
    public class Event4AllDAL : DbContext
    {
        // Your context has been configured to use a 'Event4AllDAL' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'DAL.Event4AllDAL' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Event4AllDAL' 
        // connection string in the application configuration file.
        public Event4AllDAL()
            : base("name=EventDbStringV2")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<Purchase> Purchases { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
        public virtual DbSet<PurchaseDetail> PurchaseDetails { get; set; }



        //internal static void RelateFluent(System.Data.Entity.DbModelBuilder builder)
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Primary keys
            builder.Entity<Purchase>().HasKey(q => q.Id);
            builder.Entity<Ticket>().HasKey(q => q.Id);
            builder.Entity<PurchaseDetail>().HasKey(q =>
                new
                {
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


        }


            
    }

        //public class MyEntity
        //{
        //    public int Id { get; set; }
        //    public string Name { get; set; }
        //}
    }