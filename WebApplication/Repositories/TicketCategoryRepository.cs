using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Interfaces;

namespace WebApplication.Repositories
{
    public class TicketCategoryRepository: GenericRepository<TicketCategory>,ITicketCategoryRepository
    {
        public TicketCategoryRepository(IApplicationDbContext context) : base(context)
        {

        }
    }
}