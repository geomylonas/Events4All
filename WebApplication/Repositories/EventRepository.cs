using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using DAL.Entities;
using System.Threading.Tasks;

namespace WebApplication.Repositories
{
    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
        private IApplicationDbContext _context;
        public EventRepository(IApplicationDbContext context) : base(context)
        {
            this._context = context;
        }

        public IEnumerable<Event> GetByPage(int pageNumber, int pageSize)
        {
            return _context.Set<Event>().OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }
    }
}