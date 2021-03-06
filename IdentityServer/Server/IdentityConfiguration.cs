﻿using System.Collections.Generic;
using IdentityModel;
using IdentityServer4.Models;

namespace Server
{
    public static class IdentityConfiguration
    {
        public static IEnumerable<ApiScope> GetApiScopes() =>
            new List<ApiScope>
            {
                new ApiScope("money_api", "Moneys api access"),
            };

        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource
                {
                    Name = "user.scope",
                    UserClaims =
                    {
                        "user.id",
                    }
                }
            };
        
        public static IEnumerable<Client> GetClients() => 
            new List<Client>
            {
                new Client
                {
                    ClientId = "client_id_react",
                    ClientSecrets = { new Secret("client_secret_react".ToSha256()) },
                    
                    AllowedGrantTypes = GrantTypes.Code,
                    
                    AllowedCorsOrigins = { "http://localhost:3000" },
                    
                    AllowedScopes =
                    {
                        IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Profile,
                        IdentityServer4.IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Email,
                        "money_api",
                        "user.scope",
                    },
                    
                    RedirectUris = new List<string>
                    {
                        "http://localhost:3000/authentication/callback"
                    },
                    
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:3000/"  
                    },
                    
                    AllowAccessTokensViaBrowser = true,
                    
                    AllowOfflineAccess = true,
                    
                    RequireConsent = false,
                }
            };
    }
}