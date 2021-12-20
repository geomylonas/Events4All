using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;
using WebApplication.Interfaces;
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
            container.RegisterType<ICategoryRepository, CategoryRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IEventRepository, EventRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPictureRepository, PictureRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<ITicketRepository, TicketRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPurchaseRepository, PurchaseRepository>(new ContainerControlledLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new ContainerControlledLifetimeManager());
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}