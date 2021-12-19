using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Extensions.DependencyInjection;
using WebApplication.Interfaces;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IEventRepository, EventRepository>();
            services.AddTransient<IPictureRepository, PicturesRepository>();
            services.AddTransient<IPurchaseRepository, PurchaseRepository>();
            services.AddTransient<ITicketRepository, TicketRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            //services.AddDbContext<ApplicationDbContext>(opt => opt
             //   .UseSqlServer("Server=DESKTOP-UUBJ14C\\SQLEXPRESS; Database=OrderDb;Trusted_Connection=True;"));
            return services;
        }
    }
}