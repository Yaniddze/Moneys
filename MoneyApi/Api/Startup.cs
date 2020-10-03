using Api.ApplicationInstallers.Extensions;
using Api.ServiceInstallers.Extensions;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Voyager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.InstallFromAssembly(_configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseWebSockets();
            app.UseGraphQL();

            if (!env.IsDevelopment())
            {
                app.UsePlayground("/api/moneys/", "/api/moneys/playground");
            }
            else
            {
                app.UsePlayground();
                app.UseVoyager();
            }

            // ApplicationInstallers folder
            app.InstallFromAssembly(env);
        }
    }
}
