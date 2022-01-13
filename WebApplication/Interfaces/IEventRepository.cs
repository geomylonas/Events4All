

using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Interfaces
{
    public interface IEventRepository : IGenericRepository<Event>
    {
        ICollection<Event> GetByPage(int pageNumber, int pageSize);
        ICollection<Event> GetByCategory(int pageNumber, int pageSize, int eventCategoryId);

        ICollection<Event> GetByOrganizerId(string id, int pageNumber, int pageSize);

    }
}
