using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers.Abstractions
{
    public interface IServiceInstaller
    {
        void Install(IServiceCollection services, IConfiguration configuration);
    }
}