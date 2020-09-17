using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DataBase.Migrations.MoneysContextMigrations
{
    public partial class AddTransactionTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "type_id",
                table: "Transactions",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "TransactionTypes",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionTypes", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_type_id",
                table: "Transactions",
                column: "type_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_TransactionTypes_type_id",
                table: "Transactions",
                column: "type_id",
                principalTable: "TransactionTypes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_TransactionTypes_type_id",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "TransactionTypes");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_type_id",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "type_id",
                table: "Transactions");
        }
    }
}
