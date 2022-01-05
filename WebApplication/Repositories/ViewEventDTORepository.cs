using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication.DTO;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class ViewEventDTORepository:IViewEventDTORepository
    {
        protected readonly IApplicationDbContext _context;
        

        public ViewEventDTORepository(IApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(ViewEventDTO entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(ViewEventDTO entity)
        {

            

                foreach (var ticket in entity.Tickets)
                {
                    _context.Set<Ticket>().Remove(_context.Set<Ticket>().Find(ticket.Id));
                }

                foreach (var picture in entity.Pictures)
                {
                    _context.Set<Picture>().Remove(_context.Set<Picture>().Find(picture.Id));
                }

                _context.Set<Event>().Remove(_context.Set<Event>().Find(entity.Event.Id));

      
            
        }


        public async Task<ViewEventDTO> Get(int id)
        {
            ViewEventDTO viewEventDTO = new ViewEventDTO();
            viewEventDTO.Event = _context.Set<Event>().Find(id);
            viewEventDTO.Pictures = viewEventDTO.Event.Pictures;
            viewEventDTO.Tickets = viewEventDTO.Event.Tickets;

            return await Task.FromResult(viewEventDTO);
        }

        public Task<IEnumerable<ViewEventDTO>> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(ViewEventDTO entity)
        {
            throw new NotImplementedException();
        }

  
    }
}