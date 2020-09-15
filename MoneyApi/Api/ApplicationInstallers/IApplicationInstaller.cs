using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Api.ApplicationInstallers
{
    public interface IApplicationInstaller
    {
        void Install(IApplicationBuilder app, IWebHostEnvironment env);
    }
}