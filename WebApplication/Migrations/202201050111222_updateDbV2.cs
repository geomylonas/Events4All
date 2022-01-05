namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDbV2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Categories", "Ticket_Id", "dbo.Tickets");
            DropIndex("dbo.Categories", new[] { "Ticket_Id" });
            AddColumn("dbo.Tickets", "Category_Id", c => c.Int());
            CreateIndex("dbo.Tickets", "Category_Id");
            AddForeignKey("dbo.Tickets", "Category_Id", "dbo.Categories", "Id");
            DropColumn("dbo.Categories", "Ticket_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Categories", "Ticket_Id", c => c.Int());
            DropForeignKey("dbo.Tickets", "Category_Id", "dbo.Categories");
            DropIndex("dbo.Tickets", new[] { "Category_Id" });
            DropColumn("dbo.Tickets", "Category_Id");
            CreateIndex("dbo.Categories", "Ticket_Id");
            AddForeignKey("dbo.Categories", "Ticket_Id", "dbo.Tickets", "Id");
        }
    }
}
