namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PurchasesToPerson : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Purchases", name: "Customer_Id", newName: "Person_Id");
            RenameIndex(table: "dbo.Purchases", name: "IX_Customer_Id", newName: "IX_Person_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Purchases", name: "IX_Person_Id", newName: "IX_Customer_Id");
            RenameColumn(table: "dbo.Purchases", name: "Person_Id", newName: "Customer_Id");
        }
    }
}
