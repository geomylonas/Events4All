using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using DAL.Entities;
using WebApplication.App_Start;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [EnableCors("*", "*", "*")]
    public class EventsController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        // GET: api/Events
        [Route("api/Events/{pageNumber}/{pageSize}")]
        public IEnumerable<Event> GetAllByPage(int pageNumber, int pageSize)
        { 
            return UnitOfWork.Events.GetByPage(pageNumber, pageSize);
        }
        [Route("api/Events/{pageNumber}/{pageSize}/{eventCategoryId}")]
        public IEnumerable<Event> GetAllByPageByCategory(int pageNumber, int pageSize, int eventcategoryId)
        {     
            return UnitOfWork.Events.GetByCategory(pageNumber,pageSize,eventcategoryId);
        }


        // GET: api/Events/5
        [ResponseType(typeof(Event))]
        public async Task<IHttpActionResult> GetEvent(int id)
        {
            Event @event = await UnitOfWork.Events.Get(id);
            if (@event == null)
            {
                return NotFound();
            }

            return Ok(@event);
        }

        // PUT: api/Events/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEvent(int id, Event @event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @event.Id)
            {
                return BadRequest();
            }

            UnitOfWork.Events.Update(@event);

            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Events
        [ResponseType(typeof(Event))]
        public async Task<IHttpActionResult> PostEvent(Event @event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.Events.Add(@event);
            await UnitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = @event.Id }, @event);
        }

        // DELETE: api/Events/5
        [ResponseType(typeof(Event))]
        public async Task<IHttpActionResult> DeleteEvent(int id)
        {
            Event @event = await UnitOfWork.Events.Get(id);
            if (@event == null)
            {
                return NotFound();
            }

            UnitOfWork.Events.Delete(@event);
            await UnitOfWork.Complete();

            return Ok(@event);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventExists(int id)
        {
            return UnitOfWork.Events.GetAll().Result.Count(e => e.Id == id) > 0;
        }
    }
}