using System;
using Api.GraphQL.Models.Bills;
using Api.GraphQL.Types.Abstractions;
using HotChocolate.Types;

namespace Api.GraphQL.Types.Bills
{
    public class BillMutationsType: ObjectType<BillMutations>
    {
        protected override void Configure(IObjectTypeDescriptor<BillMutations> descriptor)
        {
            descriptor.Field(x => x.CreateBillAsync(default, default, default))
                .Type<NonNullType<AbstractAnswerType<Guid, UuidType>>>()
                .Argument("userId", a => a
                    .DefaultValue(Guid.Empty)
                    .Type<NonNullType<UuidType>>()
                )
                .Argument("title", a => a
                    .Type<NonNullType<StringType>>()
                );

            descriptor.Field(x => x.DeleteBillAsync(default, default))
                .Type<NonNullType<AbstractAnswerType<Guid, UuidType>>>()
                .Argument("billId", a => a
                    .DefaultValue(Guid.Empty)
                    .Type<NonNullType<UuidType>>()
                );
            
            descriptor.Field(x => x.UpdateBillAsync(default, default, default))
                .Type<NonNullType<AbstractAnswerType<Guid, UuidType>>>()
                .Argument("billId", a => a
                    .DefaultValue(Guid.Empty)
                    .Type<NonNullType<UuidType>>()
                )
                .Argument("newTitle", a => a
                    .Type<NonNullType<StringType>>()
                );
        }
    }
}