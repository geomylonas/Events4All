namespace WebApplication.Migrations
{
    using DAL.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApplication.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApplication.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Concert" } );
            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Business Meeting" } );
            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Convention" } );
            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Party" } );
            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Lecture" } );
            context.EventCategories.AddOrUpdate(e=>e.Name, new EventCategory { Name = "Other" } );

            context.SaveChanges();


            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Bon Jovi", Description = "Rock concert of Bon Jovi Band", DateOfEvent = new DateTime(2021, 12, 25), MaxTickets = 60000, PlaceName = "OAKA", PlaceAddress = "OAKA stadium EIRHNH",EventCategory=context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Def Leppard", Description = "Rock concert of Def Leppard Band", DateOfEvent = new DateTime(2021, 6, 15), MaxTickets = 30000, PlaceName = "KARAISKAKH STADIUM", PlaceAddress = "FALIRO", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Queensryche", Description = "Acoustic concert from Queensryche", DateOfEvent = new DateTime(2021, 9, 5), MaxTickets = 5000, PlaceName = "SEF STADIUM", PlaceAddress = "FALIRO", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "METALLICA", Description = "Rock concert from Metallica", DateOfEvent = new DateTime(2022, 1, 1), MaxTickets = 45000, PlaceName = "MALAKASA", PlaceAddress = "MALAKASA", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Iron maiden 2022", Description = "Rock concert from Iron Maiden band", DateOfEvent = new DateTime(2022, 6, 1), MaxTickets = 65000, PlaceName = "OAKA", PlaceAddress = "OAKA stadium EIRHNH", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Pyx Lax", Description = "Reunion concert from Pyx Lax band", DateOfEvent = new DateTime(2022, 12, 1), MaxTickets = 2000, PlaceName = "Lazy Club", PlaceAddress = "Pentelis 1 avenue", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Scorpions", Description = "One more last concert from Scorpions", DateOfEvent = new DateTime(2022, 12, 12), MaxTickets = 10000, PlaceName = "Likavitos theater", PlaceAddress = "Likavitos", EventCategory = context.EventCategories.Find(1) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Web techs Webinar", Description = "Webinar about web application development", DateOfEvent = new DateTime(2022, 2, 10), MaxTickets = 500, PlaceName = "Remote", PlaceAddress = "Remote", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "C# Webinar", Description = "Webinar about C# application development", DateOfEvent = new DateTime(2022, 2, 20), MaxTickets = 500, PlaceName = "Remote", PlaceAddress = "Remote", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "ASP.NET Webinar", Description = "Webinar about ASP.NET technologies", DateOfEvent = new DateTime(2022, 3, 1), MaxTickets = 800, PlaceName = "Remote", PlaceAddress = "Remote", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "JAVA Webinar", Description = "Webinar about JAVA language", DateOfEvent = new DateTime(2022, 4, 1), MaxTickets = 700, PlaceName = "Remote", PlaceAddress = "Remote", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Spring Boot Webinar", Description = "Webinar about Spring Boot MVC technology", DateOfEvent = new DateTime(2022, 5, 5), MaxTickets = 750, PlaceName = "Remote", PlaceAddress = "Remote", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Spring Indoors Party", Description = "Spring afterhours party", DateOfEvent = new DateTime(2022, 4, 5), MaxTickets = 350, PlaceName = "Crow live stage", PlaceAddress = "Sinopis 35", EventCategory = context.EventCategories.Find(4) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Summer beach Party", Description = "Summmer afterhours beach party in Varkiza", DateOfEvent = new DateTime(2022, 7, 5), MaxTickets = 1200, PlaceName = "Yabanaki beach", PlaceAddress = "Yabanaki beach Varkiza", EventCategory = context.EventCategories.Find(4) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Summer beach Party allday", Description = "Summmer allday beach party in Vouliagmenh", DateOfEvent = new DateTime(2022, 7, 20), MaxTickets = 2200, PlaceName = "Vouliagmenh beach", PlaceAddress = "Vouliagmenh beach", EventCategory = context.EventCategories.Find(4) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Summer beach Party Volos", Description = "Summmer beach party in Volos", DateOfEvent = new DateTime(2022, 8, 2), MaxTickets = 1500, PlaceName = "Almiros beach", PlaceAddress = "Almiros beach Volos", EventCategory = context.EventCategories.Find(4) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2021 ComicCon", Description = "ComicCon for year 2021", DateOfEvent = new DateTime(2021, 9, 10), MaxTickets = 3000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2022 ComicCon", Description = "ComicCon for year 2022", DateOfEvent = new DateTime(2022, 10, 10), MaxTickets = 3000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2023 ComicCon", Description = "ComicCon for year 2023", DateOfEvent = new DateTime(2023, 10, 10), MaxTickets = 3000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2021 GamesCon", Description = "GamesCon for year 2021", DateOfEvent = new DateTime(2021, 3, 10), MaxTickets = 5000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2022 GamesCon", Description = "GamesCon for year 2022", DateOfEvent = new DateTime(2022, 3, 10), MaxTickets = 5000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "2023 GamesCon", Description = "GamesCon for year 2023", DateOfEvent = new DateTime(2023, 3, 10), MaxTickets = 5000, PlaceName = "Some theater", PlaceAddress = "Some theater in Athens", EventCategory = context.EventCategories.Find(3) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Developers Day 2021", Description = "Karieras Developers day for year 2021", DateOfEvent = new DateTime(2021, 1, 10), MaxTickets = 3000, PlaceName = "Technopolis", PlaceAddress = "Technopolis Gkazi", EventCategory = context.EventCategories.Find(2) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Developers Day 2022", Description = "Karieras Developers day for year 2022", DateOfEvent = new DateTime(2022, 1, 10), MaxTickets = 3000, PlaceName = "Technopolis", PlaceAddress = "Technopolis Gkazi", EventCategory = context.EventCategories.Find(2) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Developers Day 2023", Description = "Karieras Developers day for year 2023", DateOfEvent = new DateTime(2023, 1, 10), MaxTickets = 3000, PlaceName = "Technopolis", PlaceAddress = "Technopolis Gkazi", EventCategory = context.EventCategories.Find(2) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Developers Day 2024", Description = "Karieras Developers day for year 2024", DateOfEvent = new DateTime(2024, 1, 10), MaxTickets = 3000, PlaceName = "Technopolis", PlaceAddress = "Technopolis Gkazi", EventCategory = context.EventCategories.Find(2) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Intrasoft Patras Bootcamp 2021", Description = "Bootcamp in Patras organized by Intrasoft", DateOfEvent = new DateTime(2021, 1, 5), MaxTickets = 200, PlaceName = "Instrasoft Patras Building", PlaceAddress = "Old National Road", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Intrasoft Patras Bootcamp 2022", Description = "Bootcamp in Patras organized by Intrasoft", DateOfEvent = new DateTime(2022, 1, 5), MaxTickets = 200, PlaceName = "Instrasoft Patras Building", PlaceAddress = "Old National Road", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Intrasoft Patras Bootcamp 2023", Description = "Bootcamp in Patras organized by Intrasoft", DateOfEvent = new DateTime(2023, 1, 5), MaxTickets = 200, PlaceName = "Instrasoft Patras Building", PlaceAddress = "Old National Road", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Intrasoft Patras Bootcamp 2024", Description = "Bootcamp in Patras organized by Intrasoft", DateOfEvent = new DateTime(2024, 1, 5), MaxTickets = 200, PlaceName = "Instrasoft Patras Building", PlaceAddress = "Old National Road", EventCategory = context.EventCategories.Find(5) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Exotic art presentation", Description = "Exotic art presentation in Athens on 2022", DateOfEvent = new DateTime(2022, 5, 15), MaxTickets = 150, PlaceName = "some nice Building", PlaceAddress = "Athens Downtown", EventCategory = context.EventCategories.Find(6) });
            context.Events.AddOrUpdate(e => e.Title, new Event { Title = "Athens Erotica 2022", Description = "Exotic erotic art presentation and performing in Athens on 2022", DateOfEvent = new DateTime(2022, 3, 2), MaxTickets = 550, PlaceName = "some nice club", PlaceAddress = "Monastiraki", EventCategory = context.EventCategories.Find(6) });
           
            context.SaveChanges();
           
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl1", Event = context.Events.Find(1), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl2", Event = context.Events.Find(2), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl3", Event = context.Events.Find(3), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl4", Event = context.Events.Find(4), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl5", Event = context.Events.Find(4), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl6", Event = context.Events.Find(5), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl7", Event = context.Events.Find(6), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl8", Event = context.Events.Find(7), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl9", Event = context.Events.Find(7), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl10", Event = context.Events.Find(8), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl11", Event = context.Events.Find(9), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl12", Event = context.Events.Find(10), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl13", Event = context.Events.Find(11), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl14", Event = context.Events.Find(12), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl15", Event = context.Events.Find(13), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl16", Event = context.Events.Find(14), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl17", Event = context.Events.Find(15), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl18", Event = context.Events.Find(16), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl19", Event = context.Events.Find(17), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl20", Event = context.Events.Find(18), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl21", Event = context.Events.Find(19), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl22", Event = context.Events.Find(20), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl23", Event = context.Events.Find(21), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl24", Event = context.Events.Find(22), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl25", Event = context.Events.Find(23), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl27", Event = context.Events.Find(24), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl28", Event = context.Events.Find(25), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl29", Event = context.Events.Find(25), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl30", Event = context.Events.Find(25), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl31", Event = context.Events.Find(25), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl32", Event = context.Events.Find(26), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl33", Event = context.Events.Find(27), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl34", Event = context.Events.Find(28), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl35", Event = context.Events.Find(29), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl36", Event = context.Events.Find(30), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl37", Event = context.Events.Find(31), });
            context.Pictures.AddOrUpdate(p => p.Url, new Picture { Url = "Someurl38", Event = context.Events.Find(32), });
         

            context.Categories.AddOrUpdate(T => new { T.Id, T.Name }, new Category { Name = "Normal" });
            context.Categories.AddOrUpdate(T => new { T.Id, T.Name }, new Category { Name = "VIP" });

            context.SaveChanges();

            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(1), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 120, Event = context.Events.Find(1), Category = context.Categories.Find(2) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(2), Category = context.Categories.Find(2) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 10, Event = context.Events.Find(2), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(3), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 100, Event = context.Events.Find(3), Category = context.Categories.Find(2) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 50, Event = context.Events.Find(4), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(5), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(6), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 60, Event = context.Events.Find(7), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 160, Event = context.Events.Find(7), Category = context.Categories.Find(2) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 30, Event = context.Events.Find(8), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 30, Event = context.Events.Find(9), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 30, Event = context.Events.Find(10), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 40, Event = context.Events.Find(11), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 45, Event = context.Events.Find(12), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 45, Event = context.Events.Find(13), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 20, Event = context.Events.Find(14), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 20, Event = context.Events.Find(15), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 15, Event = context.Events.Find(16), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 80, Event = context.Events.Find(17), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 80, Event = context.Events.Find(18), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 80, Event = context.Events.Find(19), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 80, Event = context.Events.Find(20), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 80, Event = context.Events.Find(21), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 10, Event = context.Events.Find(22), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 10, Event = context.Events.Find(23), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 10, Event = context.Events.Find(24), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 10, Event = context.Events.Find(25), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 2000, Event = context.Events.Find(26), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 2000, Event = context.Events.Find(27), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 2000, Event = context.Events.Find(28), Category = context.Categories.Find(1) });
            context.Tickets.AddOrUpdate(new Ticket { Price = 2000, Event = context.Events.Find(29), Category = context.Categories.Find(1) }); //33
            context.Tickets.AddOrUpdate(new Ticket { Price = 2000, Event = context.Events.Find(30), Category = context.Categories.Find(1) }); //33
            context.Tickets.AddOrUpdate(new Ticket { Price = 100, Event = context.Events.Find(31), Category = context.Categories.Find(1) }); //33
            context.Tickets.AddOrUpdate(new Ticket { Price = 500, Event = context.Events.Find(32), Category = context.Categories.Find(1) }); //33
            context.Tickets.AddOrUpdate(new Ticket { Price = 1500, Event = context.Events.Find(32), Category = context.Categories.Find(2) }); //33


            context.Purchases.AddOrUpdate(new Purchase { Amount = 300, DateOfPurchase = new DateTime(2021, 11, 1), });
            context.Purchases.AddOrUpdate(new Purchase { Amount = 2120, DateOfPurchase = new DateTime(2021, 5, 5), });
            context.Purchases.AddOrUpdate(new Purchase { Amount = 4010, DateOfPurchase = new DateTime(2021, 1, 5), });

            context.SaveChanges();

            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 1, TicketId = 1, Quantity = 5, TotalPrice = 300 });
            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 2, TicketId = 30, Quantity = 1, TotalPrice = 2000 });
            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 2, TicketId = 29, Quantity = 2, TotalPrice = 20 });
            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 3, TicketId = 31, Quantity = 1, TotalPrice = 2000 });
            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 3, TicketId = 32, Quantity = 1, TotalPrice = 2000 });
            context.PurchaseDetails.AddOrUpdate(new PurchaseDetail { PurchaseId = 3, TicketId = 28, Quantity = 1, TotalPrice = 10 });



        }

    }
}
