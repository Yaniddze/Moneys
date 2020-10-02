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
            
            app.UseGraphQL();

            if (env.IsDevelopment())
            {
                app.UseVoyager();
                app.UsePlayground();
            }
            else
            {
                app.Use(async (ctx, next) =>
                {
                    ctx.Request.Scheme = "https";
                    await next();
                });
                app.UseVoyager("/api/moneys/", "/api/moneys/voyager");
                app.UsePlayground("/api/moneys/", "/api/moneys/playground");
            }

            app.UseAuthentication();
            app.UseAuthorization();
            
            // ApplicationInstallers folder
            app.InstallFromAssembly(env);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute()
                    .RequireAuthorization("ApiScope");
            });
        }
    }
}
