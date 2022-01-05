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
        public EventRepository(IApplicationDbContext context) : base(context)
        {       
        }

        public IEnumerable<Event> GetByCategory(int pageNumber, int pageSize, int eventCategoryId)
        {
           var temp= _context.Set<Event>().Where(e=>e.EventCategory.Id==eventCategoryId);
            return temp.OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }

        public IEnumerable<Event> GetByPage(int pageNumber, int pageSize)
        {
            return _context.Set<Event>().OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }


    }
}