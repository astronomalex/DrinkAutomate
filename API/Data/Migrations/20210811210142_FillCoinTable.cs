using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class FillCoinTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO Coins values (newid(), 1, 1, 0, 0)
INSERT INTO Coins values (newid(), 2, 1, 0, 0)
INSERT INTO Coins values (newid(), 5, 1, 0, 0)
INSERT INTO Coins values (newid(), 10, 1, 0, 0)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Coins");
        }
    }
}
