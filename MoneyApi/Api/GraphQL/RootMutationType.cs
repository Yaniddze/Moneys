using HotChocolate.Types;

namespace Api.GraphQL
{
    public class RootMutationType: ObjectType<RootMutations>
    {
        protected override void Configure(IObjectTypeDescriptor<RootMutations> descriptor)
        {
            if (!Program.Development)
            {
                descriptor.Authorize("ApiScope");
            }

            descriptor.Field(x => x.CreateTransactionAsync(default))
                .Name("createTransaction")
                .Description("Create new transaction for user and return new transaction's id");

            descriptor.Field(x => x.RemoveTransactionAsync(default))
                .Name("removeTransaction")
                .Description("Remove transaction by id and return true on success");

            descriptor.Field(x => x.UpdateTransactionAsync(default))
                .Name("updateTransaction")
                .Description("Update transaction by id and return true on success");

            descriptor.Field(x => x.RemoveBillAsync(default))
                .Name("removeBill")
                .Description("Delete bill by id and return true on success");

            descriptor.Field(x => x.CreateBillAsync(default))
                .Name("createBill")
                .Description("Create new bill for user and return new bill's id");

            descriptor.Field(x => x.UpdateBillAsync(default))
                .Name("updateBill")
                .Description("Update bill by id and return true on success");
        }
    }
}