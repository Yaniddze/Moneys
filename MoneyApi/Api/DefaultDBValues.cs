using System;
using System.Collections.Generic;
using Api.Domain;

namespace Api
{
    public static class DefaultDBValues
    {
        public static IEnumerable<TransactionType> GetDefaultTransactionTypes() =>
            new List<TransactionType>
            {
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Еда",
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Автомобиль",
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Квартира",
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Прочее",
                },
            };
    }
}