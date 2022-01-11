using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> Get(int id);
        Task<ICollection<T>> GetAll();
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}