using Api.Domain;
using HotChocolate.Types;

namespace Api.GraphQL.Types
{
    public class BillType: ObjectType<Bill>
    {
        protected override void Configure(IObjectTypeDescriptor<Bill> descriptor)
        {
            descriptor.Field(x => x.Id)
                .Type<NonNullType<IdType>>();

            descriptor.Field(x => x.Title)
                .Type<StringType>()
                .Name("title");
        }
    }
}