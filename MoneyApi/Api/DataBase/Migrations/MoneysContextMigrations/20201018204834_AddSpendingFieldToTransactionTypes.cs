using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DataBase.Migrations.MoneysContextMigrations
{
    public partial class AddSpendingFieldToTransactionTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Spending",
                table: "TransactionTypes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spending",
                table: "TransactionTypes");
        }
    }
}
