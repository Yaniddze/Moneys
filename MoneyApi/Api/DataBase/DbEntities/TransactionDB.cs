using System;

namespace Api.DataBase.DbEntities
{
    public class TransactionDB
    {
        public Guid Id { get; set; }
        public Guid BillId { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }

        public BillDB Bill { get; set; }
    }
}