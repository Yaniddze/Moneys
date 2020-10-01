using Api.GraphQL.Types.Bills;
using Api.GraphQL.Types.TransactionTypes;
using Api.ServiceInstallers.Abstractions;
using HotChocolate;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public class GraphQLInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddGraphQL(sp => SchemaBuilder.New()
                .AddServices(sp)
                
                .AddAuthorizeDirectiveType()
                
                .AddQueryType<BillQueriesType>()
                .AddMutationType<BillMutationsType>()
                
                .AddType<BillQueriesType>()
                .AddType<TransactionTypeQueriesType>()
                
                .Create()
            );
        }
    }
}