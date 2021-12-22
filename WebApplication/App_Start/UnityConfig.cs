using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;
using WebApplication.Interfaces;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            //container.RegisterType<ICategoryRepository, CategoryRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<IEventRepository, EventRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<IPictureRepository, PictureRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<ITicketRepository, TicketRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<IPurchaseRepository, PurchaseRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());
            //container.RegisterType<IdentityDbContext<Person>, ApplicationDbContext>(new HierarchicalLifetimeManager());
            
            //GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

       // new ContainerControlledLifetimeManager()
    }
}