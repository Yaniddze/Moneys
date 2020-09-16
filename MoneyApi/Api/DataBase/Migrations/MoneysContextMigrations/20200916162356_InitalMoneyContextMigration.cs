using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.DataBase.Migrations.MoneysContextMigrations
{
    public partial class InitalMoneyContextMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    user_id = table.Column<Guid>(nullable: false),
                    title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.id);
                    table.ForeignKey(
                        name: "FK_Bills_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    bill_id = table.Column<Guid>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    value = table.Column<double>(nullable: false),
                    date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.id);
                    table.ForeignKey(
                        name: "FK_Transactions_Bills_bill_id",
                        column: x => x.bill_id,
                        principalTable: "Bills",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bills_id",
                table: "Bills",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_user_id",
                table: "Bills",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_bill_id",
                table: "Transactions",
                column: "bill_id");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_id",
                table: "Transactions",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_id",
                table: "Users",
                column: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
