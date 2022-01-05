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
    public class EventCategoriesController : ApiController
    {
        [EnableCors("*", "*", "*")]
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        // GET: api/EventCategories
        public async Task<IEnumerable<EventCategory>> GetEventCategories()
        {
            return  await UnitOfWork.EventCategories.GetAll();
        }

        // GET: api/EventCategories/5
        [ResponseType(typeof(EventCategory))]
        public async Task<IHttpActionResult> GetEventCategory(int id)
        {
            EventCategory eventCategory = await UnitOfWork.EventCategories.Get(id);
            if (eventCategory == null)
            {
                return NotFound();
            }

            return Ok(eventCategory);
        }

        //// PUT: api/EventCategories/5
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutEventCategory(int id, EventCategory eventCategory)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != eventCategory.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(eventCategory).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EventCategoryExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/EventCategories
        //[ResponseType(typeof(EventCategory))]
        //public async Task<IHttpActionResult> PostEventCategory(EventCategory eventCategory)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.EventCategories.Add(eventCategory);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = eventCategory.Id }, eventCategory);
        //}

        //// DELETE: api/EventCategories/5
        //[ResponseType(typeof(EventCategory))]
        //public async Task<IHttpActionResult> DeleteEventCategory(int id)
        //{
        //    EventCategory eventCategory = await db.EventCategories.FindAsync(id);
        //    if (eventCategory == null)
        //    {
        //        return NotFound();
        //    }

        //    db.EventCategories.Remove(eventCategory);
        //    await db.SaveChangesAsync();

        //    return Ok(eventCategory);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventCategoryExists(int id)
        {
            return UnitOfWork.Events.GetAll().Result.Count(e => e.Id == id) > 0;
        }
    }
}