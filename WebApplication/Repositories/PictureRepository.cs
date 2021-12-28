using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;
using DAL.Entities;

namespace WebApplication.Repositories
{
    public class PictureRepository : GenericRepository<Picture>, IPictureRepository
    {
        public PictureRepository(IApplicationDbContext context) : base(context)
        {

        }
    }
}