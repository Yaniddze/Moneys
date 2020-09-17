using Api.DataBase.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace Api.DataBase
{
    public class MoneysContext: DbContext
    {
        public virtual DbSet<UserDB> Users { get; set; }
        public virtual DbSet<TransactionDB> Transactions { get; set; }
        public virtual DbSet<TransactionTypeDB> TransactionTypes { get; set; }
        public virtual DbSet<BillDB> Bills { get; set; }
        
        public MoneysContext(DbContextOptions<MoneysContext> options)
            :base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Tables

            modelBuilder.Entity<UserDB>()
                .ToTable("Users")
                .HasIndex(x => x.Id);
            
            modelBuilder.Entity<TransactionDB>()
                .ToTable("Transactions")
                .HasIndex(x => x.Id);
            
            modelBuilder.Entity<BillDB>()
                .ToTable("Bills")
                .HasIndex(x => x.Id);

            #endregion

            #region Fields

            #region User

            modelBuilder.Entity<UserDB>()
                .Property(x => x.Username)
                .HasColumnName("username");
            
            modelBuilder.Entity<UserDB>()
                .Property(x => x.Id)
                .HasColumnName("id");
            #endregion

            #region Bills

            modelBuilder.Entity<BillDB>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<BillDB>()
                .Property(x => x.Title)
                .HasColumnName("title");

            modelBuilder.Entity<BillDB>()
                .Property(x => x.UserId)
                .HasColumnName("user_id");

            #endregion

            #region Transactions
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.Id)
                .HasColumnName("id");
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.Date)
                .HasColumnName("date");
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.Description)
                .HasColumnName("description");
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.Value)
                .HasColumnName("value");
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.BillId)
                .HasColumnName("bill_id");
            
            modelBuilder.Entity<TransactionDB>()
                .Property(x => x.TypeId)
                .HasColumnName("type_id");

            #endregion

            #region Transaction Type
            
            modelBuilder.Entity<TransactionTypeDB>()
                .Property(x => x.Id)
                .HasColumnName("id");
            
            modelBuilder.Entity<TransactionTypeDB>()
                .Property(x => x.Title)
                .HasColumnName("title");

            #endregion

            #endregion

            #region Foreign keys

            modelBuilder.Entity<BillDB>()
                .HasOne(bill => bill.User)
                .WithMany(user => user.Bills)
                .HasForeignKey(bill => bill.UserId);

            modelBuilder.Entity<TransactionDB>()
                .HasOne(transaction => transaction.Bill)
                .WithMany(bill => bill.Transactions)
                .HasForeignKey(transaction => transaction.BillId);

            modelBuilder.Entity<TransactionDB>()
                .HasOne(tran => tran.Type)
                .WithMany(type => type.Transactions)
                .HasForeignKey(tran => tran.TypeId);

            #endregion
        }
    }
}