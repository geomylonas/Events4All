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

            container.RegisterType<IApplicationDbContext, ApplicationDbContext>(new PerResolveLifetimeManager());
            container.RegisterType<ICategoryRepository, CategoryRepository>(new PerResolveLifetimeManager());
            container.RegisterType<IEventRepository, EventRepository>(new PerResolveLifetimeManager());
            container.RegisterType<IPictureRepository, PictureRepository>(new PerResolveLifetimeManager());
            container.RegisterType<ITicketRepository, TicketRepository>(new PerResolveLifetimeManager());
            container.RegisterType<IPurchaseRepository, PurchaseRepository>(new PerResolveLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new PerResolveLifetimeManager());
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}