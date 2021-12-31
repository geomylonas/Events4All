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
    public class PicturesController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        // GET: api/Pictures
        public Task<IEnumerable<Picture>> GetPictures()
        {
            return UnitOfWork.Pictures.GetAll();
        }

        // GET: api/Pictures/5
        [ResponseType(typeof(Picture))]
        public async Task<IHttpActionResult> GetPicture(int id)
        {
            Picture picture = await UnitOfWork.Pictures.Get(id);
            if (picture == null)
            {
                return NotFound();
            }

            return Ok(picture);
        }

        // PUT: api/Pictures/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPicture(int id, Picture picture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != picture.Id)
            {
                return BadRequest();
            }

            UnitOfWork.Pictures.Update(picture);

            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PictureExists(id))
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

        // POST: api/Pictures
        [ResponseType(typeof(Picture))]
        public async Task<IHttpActionResult> PostPicture(Picture picture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.Pictures.Add(picture);
            await UnitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = picture.Id }, picture);
        }

        // DELETE: api/Pictures/5
        [ResponseType(typeof(Picture))]
        public async Task<IHttpActionResult> DeletePicture(int id)
        {
            Picture picture = await UnitOfWork.Pictures.Get(id);
            if (picture == null)
            {
                return NotFound();
            }

            UnitOfWork.Pictures.Delete(picture);
            await UnitOfWork.Complete();

            return Ok(picture);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PictureExists(int id)
        {
            return UnitOfWork.Pictures.GetAll().Result.Count(e => e.Id == id) > 0;
        }
    }
}