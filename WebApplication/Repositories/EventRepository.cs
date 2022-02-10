using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using System.Threading.Tasks;
using System.Data.Entity;
using DAL.Entities;
using WebApplication.Controllers;

namespace WebApplication.Repositories
{
    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
        public EventRepository(IApplicationDbContext context) : base(context)
        {
        }

        public ICollection<Event> GetByCategory(int pageNumber, int pageSize, int eventCategoryId)
        {
            var temp = _context.Set<Event>().Where(e => e.EventCategory.Id == eventCategoryId);
            return temp.OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }

        public ICollection<Event> GetByPage(int pageNumber, int pageSize)
        {
            return _context.Set<Event>().OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }

        public ICollection<Event> GetByOrganizerId(string id, int pageNumber, int pageSize)
        {
            var organizer = _context.Set<Organizer>().Find(id);
            var events = organizer.Events;
            return events.OrderBy(e => e.DateOfEvent).Skip(pageSize * pageNumber).Take(pageSize).ToList();
        }

        public new void Update(Event @event)
        {
            var user = _context.Set<Organizer>().Find(AccountController.GetUserID());
            var oldEvent = _context.Set<Event>().Find(@event.Id);
            if (user.Events.Contains(_context.Set<Event>().Find(@event.Id)))
            {
                _context.Set<Picture>().RemoveRange(oldEvent.Pictures); 
                oldEvent.Pictures.Clear();
                foreach(var picture in @event.Pictures)
                {
                    oldEvent.Pictures.Add(picture);
                }
                oldEvent.Tickets.ToList().Find(t => t.Category.Name == "Normal").Price = @event.Tickets.ToList().Find(t => t.Category.Name == "Normal").Price;
                if (@event.Tickets.Count > 1)
                {
                    if (oldEvent.Tickets.Count > 1)
                    {
                        oldEvent.Tickets.ToList().Find(t => t.Category.Name == "VIP").Price = @event.Tickets.ToList().Find(t => t.Category.Name == "VIP").Price;
                    }
                    else
                    {
                        oldEvent.Tickets.Add(@event.Tickets.ToList().Find(t => t.Category.Name == "VIP"));
                    }
                }
                else if (oldEvent.Tickets.Count > 1)
                {
                    _context.Set<Ticket>().Remove(oldEvent.Tickets.ToList().Find(t => t.Category.Name == "VIP"));
                }
                oldEvent.PlaceAddress = @event.PlaceAddress;
                oldEvent.PlaceName = @event.PlaceName;
                oldEvent.Title = @event.Title;
                oldEvent.AvailableTickets = @event.AvailableTickets;
                oldEvent.DateOfEvent = @event.DateOfEvent;
                oldEvent.Description = @event.Description;
                oldEvent.EventCategory = _context.Set<EventCategory>().Find(@event.EventCategory.Id);
            }
            else
            {
                throw new Exception("The user doesnt own the event");
            }
        }

        public new void Delete(Event @event)
        {    
            var user = _context.Set<Organizer>().Find(AccountController.GetUserID());
            if (user.Events.Contains(_context.Set<Event>().Find(@event.Id)))
            {
                if (CheckIfTickesAreSold(_context.Set<Event>().Find(@event.Id)))
                {
                    throw new Exception("Event has already sold tickets and cannot be deleted");
                    return;
                }
                foreach (var picture in _context.Set<Picture>().Where(p => p.Event.Id == @event.Id).ToList())
                {    
                    _context.Set<Picture>().Remove(picture);
                }
                foreach (var ticket in _context.Set<Ticket>().Where(p => p.Event.Id == @event.Id).ToList())
                {
                    foreach (var purchaseDetail in _context.Set<PurchaseDetail>().Where(pd => pd.TicketId == ticket.Id))
                    {
                        _context.Set<PurchaseDetail>().Remove(purchaseDetail);
                    }
                    _context.Set<Ticket>().Remove(ticket);
                }
                _context.Set<Event>().Remove(@event);
            }
            else
            {
                throw new Exception("The user doesnt own the event");
            }
        }

        public new void Add(Event @event)
        {
            var eventCategory = _context.Set<EventCategory>().Find(@event.EventCategory.Id);
            @event.EventCategory = eventCategory;

            foreach (var ticket in @event.Tickets)
            {
                var ticketCategory = _context.Set<Category>().Find(ticket.Category.Id);
                ticket.Category = ticketCategory;
            }                
            var user = _context.Set<Organizer>().Find(AccountController.GetUserID());
            user.Events.Add(@event);
            _context.Set<Event>().Add(@event);
        }

        public bool CheckIfTickesAreSold(Event @event)
        {
            foreach (var ticket in @event.Tickets)
            {
                if (_context.Set<PurchaseDetail>().Where(pd => pd.TicketId == ticket.Id).Count()>0)
                {
                    return true;
                }
            }
                return false;       
        }
    }
}