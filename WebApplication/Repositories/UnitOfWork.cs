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
        private readonly ApplicationDbContext _context;
        public ICategoryRepository Categories { get; }
        public IEventRepository Events { get; }
        public IPictureRepository Pictures { get; }
        public IPurchaseRepository Purchases { get; }
        public ITicketRepository Tickets { get; }


        public UnitOfWork()
        {
            this._context = new ApplicationDbContext();

            this.Categories = new CategoryRepository(_context);
            this.Events = new EventRepository(_context);
            this.Pictures = new PictureRepository(_context);
            this.Purchases = new PurchaseRepository(_context);
            this.Tickets = new TicketRepository(_context);
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