using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        ICategoryRepository Categories { get; }
        IEventRepository Events { get; }
        IPictureRepository Pictures { get; }
        IPurchaseRepository Purchases { get; }
        ITicketRepository Tickets { get; }


        public UnitOfWork(ApplicationDbContext events4AllDbContext,
            ICategoryRepository categoriesRepository,
            IEventRepository eventsRepository,
            IPictureRepository picturesRepository,
            IPurchaseRepository purchasesRepository,
            ITicketRepository ticketsRepository)
        {
            this._context = events4AllDbContext;

            this.Categories= categoriesRepository;
            this.Events = eventsRepository;
            this.Pictures = picturesRepository;
            this.Purchases = purchasesRepository;
            this.Tickets = ticketsRepository;
        }
        public int Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
}