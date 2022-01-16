using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication.DTO;

namespace WebApplication.Interfaces
{
    public interface IPurchaseDTORepository:IGenericRepository<PurchaseDTO>
    {
        new Task<ICollection<PurchaseDTO>> GetAll();
    }
}
