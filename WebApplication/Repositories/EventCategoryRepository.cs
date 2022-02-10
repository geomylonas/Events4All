using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Interfaces;

namespace WebApplication.Repositories
{
    public class EventCategoryRepository:GenericRepository<EventCategory>,IEventCategoryRepository
    {
        public EventCategoryRepository(IApplicationDbContext context) : base(context)
        {
        }
    }
}