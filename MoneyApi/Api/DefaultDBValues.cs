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
                    Spending = true,
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Автомобиль",
                    Spending = true,
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Аренда",
                    Spending = true,
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Прочее",
                    Spending = true,
                },
                
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Прочее",
                    Spending = false,
                },
                new TransactionType
                {
                    Id = Guid.NewGuid(),
                    Title = "Зарплата",
                    Spending = false,
                },
            };
    }
}