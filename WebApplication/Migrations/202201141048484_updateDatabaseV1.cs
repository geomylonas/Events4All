namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDatabaseV1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tickets", "Price", c => c.Double(nullable: false));
            AlterColumn("dbo.PurchaseDetails", "TotalPrice", c => c.Double(nullable: false));
            AlterColumn("dbo.Purchases", "Amount", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Purchases", "Amount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.PurchaseDetails", "TotalPrice", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Tickets", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
