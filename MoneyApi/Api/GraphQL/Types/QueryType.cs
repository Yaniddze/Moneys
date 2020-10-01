using Api.GraphQL.Model;
using HotChocolate.Types;

namespace Api.GraphQL.Types
{
    public class QueryType: ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Field(x => x.GetBills(default))
                .Type<ListType<BillType>>();
        }
    }
}