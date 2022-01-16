using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
        public async Task<ICollection<Picture>> GetPictures()
        {
            return await UnitOfWork.Pictures.GetAll();
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
        public async Task<IHttpActionResult> PutPicture(Picture picture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PictureExists(picture.Id))
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


        [HttpPost]
        [Route("api/pictures/upload")]
        public async Task<IHttpActionResult> Uploadfile()
        {
            try
            {
                var fileuploadPath = "..\\..\\Files";

                var provider = new MultipartFormDataStreamProvider(fileuploadPath);
                var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
                foreach (var header in Request.Content.Headers)
                {
                    content.Headers.TryAddWithoutValidation(header.Key, header.Value);
                }
                await content.ReadAsMultipartAsync(provider);
                string uploadingFileName = provider.FileData.Select(x => x.LocalFileName).FirstOrDefault();
                string originalFileName = String.Concat(fileuploadPath, "\\" + (provider.Contents[0].Headers.ContentDisposition.FileName).Trim(new Char[] { '"' }));
                var filename = provider.Contents[0].Headers.ContentDisposition.FileName;
                if (File.Exists(originalFileName))
                {
                    File.Delete(originalFileName);
                }
                File.Move(uploadingFileName, originalFileName);
                Picture picture = new Picture();
                picture.Url = filename;
                UnitOfWork.Pictures.Add(picture);
                await  UnitOfWork.Complete();


                //Stotefile sf = new Stotefile();
                //sf.File = filename;
                //DB.Stotefiles.Add(sf);
                //DB.SaveChanges();
                return Ok("Uploaded Successfuly");
                
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, "There was and error during upload");

            }
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