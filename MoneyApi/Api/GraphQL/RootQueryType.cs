using HotChocolate.Types;

namespace Api.GraphQL
{
    public class RootQueryType: ObjectType<RootQuery>
    {
        protected override void Configure(IObjectTypeDescriptor<RootQuery> descriptor)
        {
            if (!Program.Development)
            {
                descriptor.Field(x => x.GetBillsAsync(default))
                    .Name("bills")
                    .Description("Returns all user's bills by user id")  
                    .Authorize("ApiScope");

                descriptor.Field(x => x.GetTransactionsAsync(default))
                    .Name("transactions")
                    .Description("Returns all user's transactions by user id")       
                    .Authorize("ApiScope");
            }
            else
            {
                descriptor.Field(x => x.GetBillsAsync(default))
                    .Name("bills")
                    .Description("Returns all user's bills by user id");

                descriptor.Field(x => x.GetTransactionsAsync(default))
                    .Name("transactions")
                    .Description("Returns all user's transactions by user id");
            }
            
            descriptor.Field(x => x.GetTransactionTypesAsync())
                .Name("transactionTypes")
                .Description("Returns all transaction types");
        }
    }
}