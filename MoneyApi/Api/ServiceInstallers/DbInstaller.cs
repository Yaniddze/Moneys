using Api.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public class DbInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            var connString = configuration.GetConnectionString("PostgresConnection");

            services.AddDbContextPool<MoneysContext>(options => options.UseNpgsql(connString));
        }
    }
}