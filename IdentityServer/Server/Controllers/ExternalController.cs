using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using Server.Controllers.ViewModels;
using Server.EventBus.Abstractions;
using Server.EventBus.Events;
using Server.Options;

namespace Server.Controllers
{
    public class ExternalController: Controller
    {
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationUrls urls;
        private readonly IEventBus eventBus;
        private readonly ILogger<ExternalController> logger;

        public ExternalController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, 
            ApplicationUrls urls, 
            IEventBus eventBus, 
            ILogger<ExternalController> logger)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.urls = urls;
            this.eventBus = eventBus;
            this.logger = logger;
        }
        
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUri = Url.Action(nameof(ExternalLoginCallback), "External", new
            {
                returnUrl
            });
            logger.LogInformation(returnUrl);
            var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUri);
            return Challenge(properties, provider);
        }

        public async Task<IActionResult> ExternalLoginCallback(string returnUrl)
        {
            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Redirect(urls.LoginPage);
            }

            var result = await signInManager
                .ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, true);

            if (result.Succeeded)
            {
                return Redirect(returnUrl ?? urls.DefaultRedirect);
            }

            var username = info.Principal.FindFirst(ClaimTypes.Name).Value.Replace(" ", "_");
            return View("ExternalRegister", new ExternalRegisterViewModel
            {
                Username = username,
                ReturnUrl = returnUrl
            });
        }

        public async Task<IActionResult> ExternalRegister(ExternalRegisterViewModel vm)
        {
            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Redirect(urls.LoginPage);
            }

            var user = new IdentityUser(vm.Username)
            {
                Id = Guid.NewGuid().ToString(),
                Email = info.Principal.Claims.First(x => x.Type == ClaimTypes.Email).Value, 
                EmailConfirmed = true,
            };
            var registerResult = await userManager.CreateAsync(user);

            if (!registerResult.Succeeded)
            {
                return View(new ExternalRegisterViewModel
                {
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                    Errors = Strings.Join(registerResult.Errors.Select(x => x.Description).ToArray()),
                });
            }

            var loginResult = await userManager.AddLoginAsync(user, info);

            if (!loginResult.Succeeded)
            {
                return View(new ExternalRegisterViewModel
                {
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                    Errors = Strings.Join(loginResult.Errors.Select(x => x.Description).ToArray()),
                });
            }
            
            eventBus.Publish(new NewUserEvent
            {
                Username = vm.Username,
                Id = user.Id,
            }, nameof(NewUserEvent));
            
            await userManager.AddClaimAsync(user, new Claim("usr.id", user.Id));
            
            await signInManager.SignInAsync(user, true);

            return Redirect(vm.ReturnUrl ?? urls.DefaultRedirect);
        }
    }
}