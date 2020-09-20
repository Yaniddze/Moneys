using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer4;
using IdentityServer4.Configuration;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Server.Data;

namespace Server.Installers
{
    public class IdentityServerInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            var assembly = typeof(Startup).Assembly.GetName().Name;
            var connectionString = configuration.GetConnectionString("PostgresConnection");
            services.AddDbContextPool<IdentityContext>(config => 
                config.UseNpgsql(connectionString));

            services.AddSingleton<ICorsPolicyService>((container) =>
            {
                var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
                return new DefaultCorsPolicyService(logger)
                {
                    AllowedOrigins = new List<string>
                    {
                        "http://localhost:8080"
                    }
                };
            });
            
            services.AddIdentity<IdentityUser, IdentityRole>(config =>
            {
                config.Password.RequiredLength = 4;
                config.Password.RequireDigit = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;

                config.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<IdentityContext>()
                .AddDefaultTokenProviders();

            services.AddIdentityServer()
                .AddAspNetIdentity<IdentityUser>()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseNpgsql(connectionString, sql =>
                            sql.MigrationsAssembly(assembly));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseNpgsql(connectionString, sql =>
                            sql.MigrationsAssembly(assembly));
                })
                .AddDeveloperSigningCredential();

            services.Remove(services.FirstOrDefault(descriptor => descriptor.ServiceType == typeof(IConfigureOptions<CookieAuthenticationOptions>)));

            services.AddSingleton<IConfigureOptions<CookieAuthenticationOptions>, MyCookieConfiguration>();

            services.AddCors(config =>
            {
                config.AddDefaultPolicy(policy => 
                    policy
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:8080")
                );
            });
        }
    }
    
    class MyCookieConfiguration : IConfigureNamedOptions<CookieAuthenticationOptions> {
        public void Configure(CookieAuthenticationOptions options)
        { }

        public void Configure(string name, CookieAuthenticationOptions options)
        {
            if (name == IdentityServerConstants.DefaultCookieAuthenticationScheme)
            {
                options.SlidingExpiration = false;
                options.ExpireTimeSpan = TimeSpan.FromHours(10);
                options.Cookie.Name = IdentityServerConstants.DefaultCookieAuthenticationScheme;
                options.Cookie.IsEssential = true;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

                options.LoginPath = "/Account/Login";
                options.LogoutPath = "/Account/Logout";
            }

            if (name == IdentityServerConstants.ExternalCookieAuthenticationScheme)
            {
                options.Cookie.Name = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                options.Cookie.IsEssential = true;
                // https://github.com/IdentityServer/IdentityServer4/issues/2595
                // need to set None because iOS 12 safari considers the POST back to the client from the 
                // IdP as not safe, so cookies issued from response (with lax) then should not be honored.
                // so we need to make those cookies issued without same-site, thus the browser will
                // hold onto them and send on the next redirect to the callback page.
                // see: https://brockallen.com/2019/01/11/same-site-cookies-asp-net-core-and-external-authentication-providers/
                options.Cookie.SameSite = SameSiteMode.None;
            }
        }
    }
}