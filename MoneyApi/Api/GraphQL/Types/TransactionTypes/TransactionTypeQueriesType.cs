using System.Collections.Generic;
using Api.Domain;
using Api.GraphQL.Models;
using Api.GraphQL.Types.Abstractions;
using HotChocolate.Types;

namespace Api.GraphQL.Types.TransactionTypes
{
    public class TransactionTypeQueriesType: ObjectType<TransactionTypeQueries>
    {
        protected override void Configure(IObjectTypeDescriptor<TransactionTypeQueries> descriptor)
        {
            descriptor.Field(x => x.GetTransactionTypesAsync(default))
                .Type<NonNullType<AbstractAnswerType<IEnumerable<TransactionType>, ListType<TransactionTypeQLType>>>>();
        }
    }
}