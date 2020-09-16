using System;
using System.Collections.Generic;

namespace Api.DataBase.DbEntities
{
    public class UserDB
    {
        public Guid Id { get; set; }
        public string Username { get; set; }

        public IEnumerable<BillDB> Bills { get; set; }
    }
}