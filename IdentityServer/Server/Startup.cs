using System.Net.Mime;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Server.Installers;

namespace Server
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

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.None,
                Secure = CookieSecurePolicy.Always,
            });

            app.UseAuthentication();

            app.UseIdentityServer();
            
            app.Use(async (ctx, next) =>
            {
                ctx.SetIdentityServerOrigin("https://yaniddze.com");
                await next();
            });

            using var scope = app.ApplicationServices.CreateScope();

            var logger = scope.ServiceProvider.GetService<ILogger<Startup>>();
            
             app.Use(async (context, next) =>
            {
                //context.Response.ContentType = "text/plain";
                
                // Request method, scheme, and path
                logger.LogInformation("Request Method: {context.Request.Method}", context.Request.Method);
                logger.LogInformation("Request Scheme: {context.Request.Scheme}", context.Request.Scheme);
                logger.LogInformation("Request Path: {context.Request.Path}", context.Request.Path);

                // Headers
                logger.LogInformation( "Request Headers:");

                foreach (var header in context.Request.Headers)
                {
                    logger.LogInformation( "{header.Key}: {header.Value}", header.Key, header.Value);
                }

                // Connection: RemoteIp
                logger.LogInformation("Request RemoteIp: {context.Connection.RemoteIpAddress}", context.Connection.RemoteIpAddress);
                await next();
            });
            
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}