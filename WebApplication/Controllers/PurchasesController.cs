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

        // GET: api/Purchases
        public Task<IEnumerable<Purchase>> GetPurchases()
        {
            return UnitOfWork.Purchases.GetAll();
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

        // PUT: api/Purchases/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPurchase(int id, Purchase purchase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != purchase.Id)
            {
                return BadRequest();
            }

            UnitOfWork.Purchases.Update(purchase);

            try
            {
                await UnitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
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

        // POST: api/Purchases
        [ResponseType(typeof(Purchase))]
        public async Task<IHttpActionResult> PostPurchase(Purchase purchase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.Purchases.Add(purchase);
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