using Castle.MicroKernel.Registration;
using Castle.Windsor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Interfaces;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.App_Start
{
    public class WindsorConfig
    {
        public static UnitOfWork RegisterContainer()
        {
            var container = new WindsorContainer();

            container.Register(Component.For<UnitOfWork>());
            container.Register(Component.For<IApplicationDbContext>().ImplementedBy<ApplicationDbContext>());
            container.Register(Component.For<ICategoryRepository>().ImplementedBy<CategoryRepository>());
            container.Register(Component.For<IEventRepository>().ImplementedBy<EventRepository>());
            container.Register(Component.For<IPictureRepository>().ImplementedBy<PictureRepository>());
            container.Register(Component.For<ITicketRepository>().ImplementedBy<TicketRepository>());
            container.Register(Component.For<IPurchaseRepository>().ImplementedBy<PurchaseRepository>());
            container.Register(Component.For<IPurchaseDetailRepository>().ImplementedBy<PurchaseDetailRepository>());


            return container.Resolve<UnitOfWork>();




        }
    }
}