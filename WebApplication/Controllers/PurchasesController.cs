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
    public class PurchasesController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        Random rnd = new Random();

        // GET: api/Purchases
        public async Task<ICollection<Purchase>> GetPurchases()
        {
            return await UnitOfWork.Purchases.GetAll();
        }

        // GET: api/Purchases/5
        [ResponseType(typeof(Purchase))]
        public async Task<IHttpActionResult> GetPurchase(int id)
        {
            Purchase purchase = await UnitOfWork.Purchases.Get(id);
            if (purchase == null)
            {
                return NotFound();
            }

            return Ok(purchase);
        }
        [Authorize]
        // GET: api/Purchases/ByPerson
        [Route("api/Purchases/Byperson")]
        [ResponseType(typeof(Purchase))]
        public async Task<ICollection<Purchase>> GetPurchaseByPerson()
        {
            return await UnitOfWork.Purchases.GetPurchasesByUser();
      
        }

        [HttpPost]
        [Route("api/Purchases/Check/")]
        public async Task<IHttpActionResult> Check(Purchase purchase)
        {
            var result=await Task.FromResult(UnitOfWork.Purchases.CheckPurchase(purchase));
            if (result == "OK")
            {
                return Ok();
            }
            else
            {
                return Content(HttpStatusCode.BadRequest, result);
            }

        }

        // PUT: api/Purchases/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPurchase(Purchase purchase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

       

            UnitOfWork.Purchases.Update(purchase);

            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(purchase.Id))
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
        [Authorize]
        // POST: api/Purchases
        [ResponseType(typeof(Purchase))]
        public async Task<IHttpActionResult> PostPurchase(Purchase purchase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.Purchases.Add(purchase,rnd);
            await UnitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = purchase.Id }, purchase);
        }

        // DELETE: api/Purchases/5
        [ResponseType(typeof(Purchase))]
        public async Task<IHttpActionResult> DeletePurchase(int id)
        {
            Purchase purchase = await UnitOfWork.Purchases.Get(id);
            if (purchase == null)
            {
                return NotFound();
            }

            UnitOfWork.Purchases.Delete(purchase);
            await UnitOfWork.Complete();

            return Ok(purchase);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PurchaseExists(int id)
        {
            return UnitOfWork.Purchases.GetAll().Result.Count(e => e.Id == id) > 0;
        }
    }
}