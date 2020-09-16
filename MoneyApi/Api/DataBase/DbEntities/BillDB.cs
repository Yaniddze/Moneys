using System;
using System.Collections.Generic;

namespace Api.DataBase.DbEntities
{
    public class BillDB
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }

        public UserDB User { get; set; }
        public IEnumerable<TransactionDB> Transactions { get; set; }
    }
}