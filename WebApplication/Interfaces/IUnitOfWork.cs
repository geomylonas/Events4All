using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository Categories { get; }
        IEventRepository Events { get; }
        IPictureRepository Pictures { get; }
        IPurchaseRepository Purchases { get; }
        ITicketRepository Tickets { get; }
        IPurchaseDetailRepository PurchaseDetail { get; }
        IEventCategoryRepository EventCategories { get; }
        IPurchaseDTORepository PurchaseDTO { get; }
        Task<int> Complete();
    }
}