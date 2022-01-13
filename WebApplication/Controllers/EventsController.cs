using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using DAL.Entities;
using Microsoft.AspNet.Identity;
using WebApplication.App_Start;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [EnableCors("*", "*", "*")]
    public class EventsController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();
       
        // GET: api/Events/0/5
        [Route("api/Events/{pageNumber}/{pageSize}")]
        public  async Task<ICollection<Event>> GetAllByPage(int pageNumber, int pageSize)
        {
            try
            {
                return await Task.FromResult(UnitOfWork.Events.GetByPage(pageNumber, pageSize));
            }catch (Exception ex)
            {
                Debug.Write(ex);
            }
           return null;
        }

        // GET: api/Events/0/5/3
        [Route("api/Events/{pageNumber}/{pageSize}/{eventCategoryId}")]
        public async Task<ICollection<Event>> GetAllByPageByCategory(int pageNumber, int pageSize, int eventcategoryId)
        {
            
            
                return await Task.FromResult(UnitOfWork.Events.GetByCategory(pageNumber, pageSize, eventcategoryId));
           
        }

        // GET: api/Events/organizer
        [Authorize(Roles = "Organizer")]
        [Route("api/Events/organizer/{pageNumber}/{pageSize}")]
        [ResponseType(typeof(Event))]
        public async Task<ICollection<Event>> GetEventsByOrganizerId(int pageNumber,int pageSize)
        {

            var id = AccountController.GetUserID();
            return await Task.FromResult(UnitOfWork.Events.GetByOrganizerId(id,pageNumber,pageSize));
           
        }

        // GET: api/Events/5
        //[Authorize]
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
        [Authorize(Roles = "Organizer")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEvent(Event @event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            UnitOfWork.Events.Update(@event);

            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(@event.Id))
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
        [Authorize(Roles = "Organizer")]
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
        [Authorize(Roles = "Organizer")]
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