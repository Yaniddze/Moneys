using Api.Options;
using Api.ServiceInstallers;
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
                
                var swaggerOptions = new SwaggerOptions();
                var optionsFromConfig = _configuration.GetSection(nameof(SwaggerOptions));
            
                optionsFromConfig.Bind(swaggerOptions);

                app.UseSwagger(x => { x.RouteTemplate = swaggerOptions.RouteTemplate; });
                app.UseSwaggerUI(x => { x.SwaggerEndpoint(swaggerOptions.Endpoint, swaggerOptions.Description); });
            }

            app.UseRouting();
            
            app.UseCors(x =>
            {
                x.AllowAnyOrigin();
                x.AllowAnyMethod();
                x.AllowAnyHeader();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute()
                    .RequireAuthorization("ApiScope");
            });
        }
    }
}
