namespace WebApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDatabaseV2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TicketCodes",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false),
                        PurchaseDetail_PurchaseId = c.Int(),
                        PurchaseDetail_TicketId = c.Int(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.PurchaseDetails", t => new { t.PurchaseDetail_PurchaseId, t.PurchaseDetail_TicketId })
                .Index(t => new { t.PurchaseDetail_PurchaseId, t.PurchaseDetail_TicketId });
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TicketCodes", new[] { "PurchaseDetail_PurchaseId", "PurchaseDetail_TicketId" }, "dbo.PurchaseDetails");
            DropIndex("dbo.TicketCodes", new[] { "PurchaseDetail_PurchaseId", "PurchaseDetail_TicketId" });
            DropTable("dbo.TicketCodes");
        }
    }
}
