using System;
using Api.GraphQL.Models.Bills;
using HotChocolate.Types;

namespace Api.GraphQL.Types.Bills
{
    public class BillQueriesType: ObjectType<BillQueries>
    {
        protected override void Configure(IObjectTypeDescriptor<BillQueries> descriptor)
        {
            descriptor.Field(x => x.GetBills(default, default))
                .Type<ListType<BillType>>()
                .Argument("userId", a => a
                    .DefaultValue(Guid.Empty)
                    .Type<NonNullType<UuidType>>()
                );
        }
    }
}