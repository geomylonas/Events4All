using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;
using WebApplication.Interfaces;

namespace WebApplication.Repositories
{
    public class PicturesRepository : GenericRepository<Picture>, IPictureRepository
    {
        public PicturesRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}