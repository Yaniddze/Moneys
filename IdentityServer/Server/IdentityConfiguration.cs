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
            };

        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
            };
        
        public static IEnumerable<Client> GetClients() => 
            new List<Client>
            {
                new Client
                {
                    ClientId = "client_id_react",
                    ClientSecrets = { new Secret("secret_key".ToSha256()) },
                    
                    AllowedGrantTypes = GrantTypes.Code,
                    
                    AllowedCorsOrigins = { "*" },
                    
                    AllowedScopes =
                    {
                        IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Profile,
                        IdentityServer4.IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Email,
                    },
                    
                    AllowAccessTokensViaBrowser = true,
                    
                    AllowOfflineAccess = true,
                    
                    RequireConsent = false,
                }
            };
    }
}