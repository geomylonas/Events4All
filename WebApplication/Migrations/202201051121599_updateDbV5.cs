namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDbV5 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EventCategories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Events", "EventCategory_Id", c => c.Int());
            CreateIndex("dbo.Events", "EventCategory_Id");
            AddForeignKey("dbo.Events", "EventCategory_Id", "dbo.EventCategories", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Events", "EventCategory_Id", "dbo.EventCategories");
            DropIndex("dbo.Events", new[] { "EventCategory_Id" });
            DropColumn("dbo.Events", "EventCategory_Id");
            DropTable("dbo.EventCategories");
        }
    }
}
