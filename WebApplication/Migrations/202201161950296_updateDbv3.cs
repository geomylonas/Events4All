namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDbv3 : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Pictures", "Url", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Pictures", new[] { "Url" });
        }
    }
}
