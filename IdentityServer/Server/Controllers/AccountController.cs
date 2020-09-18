using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Server.Controllers.ViewModels;
using Server.Options;

namespace Server.Controllers
{
    [Route("Account")]
    public class AccountController: Controller
    {
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly UserManager<IdentityUser> userManager;
        private readonly IIdentityServerInteractionService interactionService;
        private readonly ApplicationUrls urls;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IIdentityServerInteractionService interactionService, 
            ApplicationUrls urls)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.interactionService = interactionService;
            this.urls = urls;
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await signInManager.SignOutAsync();

            var logoutRequest = await interactionService.GetLogoutContextAsync(logoutId);

            if (string.IsNullOrEmpty(logoutRequest.PostLogoutRedirectUri))
            {
                return Redirect(urls.DefaultRedirect);
            }

            return Redirect(logoutRequest.PostLogoutRedirectUri);
        }

        [HttpGet("Login")]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var externalProviders = await signInManager.GetExternalAuthenticationSchemesAsync();
            return View("Login", new LoginViewModel
            {
                Errors = new []{ "" },
                ReturnUrl = returnUrl,
                ExternalProviders = externalProviders
            });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginViewModel vm)
        {
            if (!ModelState.IsValid)
            {
                return View("Login", new LoginViewModel
                {
                    ExternalProviders = await signInManager.GetExternalAuthenticationSchemesAsync(),
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                    Errors = GetModelStateErrors(),
                });
            }
            
            var result = await signInManager.PasswordSignInAsync(vm.Username, vm.Password, true, false);

            if (result.Succeeded)
            {
                return Redirect(vm.ReturnUrl);
            }

            return View("Login", new LoginViewModel
            {
                ExternalProviders = await signInManager.GetExternalAuthenticationSchemesAsync(),
                ReturnUrl = vm.ReturnUrl,
                Username = vm.Username,
                Errors = new []{ "User not found" },
            });
        }

        [HttpGet("Register")]
        public IActionResult Register(string returnUrl)
        {
            return View("Register", new RegisterViewModel
            {
                Errors = new []{ "" },
                ReturnUrl = returnUrl
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterViewModel vm)
        {
            if (!ModelState.IsValid)
            {
                return View("Register", new RegisterViewModel
                {
                    Email = vm.Email,
                    Errors = GetModelStateErrors(),
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                });
            }

            var user = new IdentityUser(vm.Username)
            {
                Email = vm.Email,
                EmailConfirmed = true,
            };
            var result = await userManager.CreateAsync(user, vm.Password);

            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, true);

                return Redirect(vm.ReturnUrl);
            }

            return View("Register", new RegisterViewModel
            {
                Email = vm.Email,
                Errors = result.Errors.Select(x => x.Description),
                ReturnUrl = vm.ReturnUrl,
                Username = vm.Username,
            });
        }
        
        private IEnumerable<string> GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray()));
    }
}