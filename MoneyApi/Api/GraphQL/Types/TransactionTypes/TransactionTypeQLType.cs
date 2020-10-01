using Api.Domain;
using HotChocolate.Types;

namespace Api.GraphQL.Types.TransactionTypes
{
    public class TransactionTypeQLType: ObjectType<TransactionType>
    {
        protected override void Configure(IObjectTypeDescriptor<TransactionType> descriptor)
        {
            descriptor.Field(x => x.Title)
                .Type<NonNullType<StringType>>()
                .Name("title");

            descriptor.Field(x => x.Id)
                .Type<NonNullType<UuidType>>()
                .Name("id");
        }
    }
}