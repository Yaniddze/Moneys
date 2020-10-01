using System;
using System.Collections.Generic;
using Api.Domain;
using Api.GraphQL.Models.Bills;
using Api.GraphQL.Types.Abstractions;
using HotChocolate.Types;

namespace Api.GraphQL.Types.Bills
{
    public class BillQueriesType: ObjectType<BillQueries>
    {
        protected override void Configure(IObjectTypeDescriptor<BillQueries> descriptor)
        {
            descriptor.Field(x => x.GetBills(default, default))
                .Type<NonNullType<AbstractAnswerType<IEnumerable<Bill>, ListType<BillType>>>>()
                .Argument("userId", a => a
                    .DefaultValue(Guid.Empty)
                    .Type<NonNullType<UuidType>>()
                );
        }
    }
}