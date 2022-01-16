using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication.App_Start;
using WebApplication.DTO;
using WebApplication.Interfaces;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    public class PurchaseDTOController : ApiController
    {

        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();


        //GET: api/PurchaseDTO
       [Authorize]
        public async Task<ICollection<PurchaseDTO>> GetAll()
        {

            return await UnitOfWork.PurchaseDTO.GetAll();
        }




        // GET: api/PurchaseDTO/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PurchaseDTO
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/PurchaseDTO/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PurchaseDTO/5
        public void Delete(int id)
        {
        }
    }
}
