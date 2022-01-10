using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using DAL.Entities;
using System.Threading.Tasks;
using System.Data.Entity;

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

        public IEnumerable<Event> GetByOrganizerId(int id)
        {
            return _context.Set<Organizer>().Find(id).Events.ToList();
        }

        public new void Update(Event @event){
            _context.Entry(@event).State= EntityState.Modified;
            _context.Entry(@event.EventCategory).State = EntityState.Modified;
            
            foreach (var picture in _context.Set<Picture>().Where(p => p.Event.Id == @event.Id).ToList())
            {
                _context.Set<Picture>().Remove(picture);
            }
            foreach (var picture in @event.Pictures)
            {

                _context.Set<Picture>().Add(picture);
            }

            foreach (var ticket in _context.Set<Ticket>().Where(p => p.Event.Id == @event.Id).ToList())
            {
                _context.Set<Ticket>().Remove(ticket);
            }

            foreach (var ticket in @event.Tickets)
            {

                _context.Set<Ticket>().Add(ticket);
               
            }
        }

        public new void Delete(Event @event)
        {
            foreach (var picture in _context.Set<Picture>().Where(p => p.Event.Id == @event.Id).ToList())
            {
                ;
                _context.Set<Picture>().Remove(picture);
            }
            foreach (var ticket in _context.Set<Ticket>().Where(p => p.Event.Id == @event.Id).ToList())
            {
                _context.Set<Ticket>().Remove(ticket);
            }

            _context.Set<Event>().Remove(@event);
        }

        public new void Add(Event @event)
        {
            var eventCategory=_context.Set<EventCategory>().Find(@event.EventCategory.Id);
            @event.EventCategory = eventCategory;

            foreach (var ticket in @event.Tickets)
            {

                var ticketCategory = _context.Set<Category>().Find(ticket.Category.Id);
                ticket.Category = ticketCategory;

            }
            _context.Set<Event>().Add(@event);
        }

    }
}