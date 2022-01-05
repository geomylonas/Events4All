using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IApplicationDbContext _context;
        public ICategoryRepository Categories { get; }
        public IEventRepository Events { get; }
        public IPictureRepository Pictures { get; }
        public IPurchaseRepository Purchases { get; }
        public ITicketRepository Tickets { get; }

        public IPurchaseDetailRepository PurchaseDetail { get; }

        public IEventCategoryRepository EventCategories { get; }


        public UnitOfWork(IApplicationDbContext events4AllDbContext,
            ICategoryRepository categoriesRepository,
            IEventRepository eventsRepository,
            IPictureRepository picturesRepository,
            IPurchaseRepository purchasesRepository,
            ITicketRepository ticketsRepository, 
            IPurchaseDetailRepository PurchaseDetailRepository,
            IEventCategoryRepository EventCategoryRepository)
        {
            this._context = events4AllDbContext;

            this.Categories = categoriesRepository;
            this.Events = eventsRepository;
            this.Pictures = picturesRepository;
            this.Purchases = purchasesRepository;
            this.Tickets = ticketsRepository;
            this.PurchaseDetail = PurchaseDetailRepository;
            this.EventCategories = EventCategoryRepository;
        }

        

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
            
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