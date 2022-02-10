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
    public class EventCategoriesController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        // GET: api/EventCategories
        public async Task<ICollection<EventCategory>> GetEventCategories()
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