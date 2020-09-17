using System;
using System.Collections.Generic;

namespace Api.DataBase.DbEntities
{
    public class TransactionTypeDB
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public IEnumerable<TransactionDB> Transactions { get; set; }
    }
}