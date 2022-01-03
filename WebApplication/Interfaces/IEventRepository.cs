
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
        IEnumerable<Event> GetByPage(int pageNumber, int pageSize);
    }
}
