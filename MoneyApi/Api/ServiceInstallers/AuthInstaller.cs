﻿using Api.Options;
using Api.ServiceInstallers.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Api.ServiceInstallers
{
    public class AuthInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            if (Program.Development)
            {
                return;
            }
            
            var identityOptions = new IdentityOptions();
            var optionsFromConfig = configuration.GetSection(nameof(IdentityOptions));
                    
            optionsFromConfig.Bind(identityOptions);
            
            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", config =>
                {
                    config.Authority = identityOptions.Authority;

                    config.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                    };
                });

            services.AddAuthorization(x =>
            {
                x.AddPolicy("ApiScope", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("scope", "money_api");
                });
            });
        }
    }
}