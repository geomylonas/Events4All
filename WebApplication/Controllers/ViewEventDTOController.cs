using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApplication.App_Start;
using WebApplication.DTO;
using WebApplication.Interfaces;

namespace WebApplication.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ViewEventDTOController : ApiController
    {
        private IUnitOfWork UnitOfWork = WindsorConfig.RegisterContainer();

        // GET: api/ViewEventDTO/1
        [HttpGet]
        [ResponseType(typeof(ViewEventDTO))]
        public async Task<IHttpActionResult> GetViewEventDTO(int id)
        {
            try
            {
                ViewEventDTO viewEventDTO = await UnitOfWork.ViewEventDTO.Get(id);
                if (viewEventDTO == null)
                {
                    return NotFound();
                }
                return Ok(viewEventDTO);
            }
            catch (Exception ex)
            {
                Debug.Write(ex);
            }
            

           return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong!"));
        }

        // DELETE: api/ViewEventDTO
        [HttpDelete]
        [ResponseType(typeof(ViewEventDTO))]
        public async Task<IHttpActionResult> DeleteViewEventDTO(ViewEventDTO viewEventDTO)
        {
            
            if (viewEventDTO == null)
            {
                return NotFound();
            }

            try
            {
                UnitOfWork.ViewEventDTO.Delete(viewEventDTO);
                await UnitOfWork.Complete();

                return Ok(viewEventDTO);
            }catch(Exception ex)
            {
                Debug.Write(ex);
            }
            return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong!"));
        }






    }
}
