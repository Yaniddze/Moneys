using System.Threading.Tasks;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Controllers.ViewModels;
using Server.Options;

namespace Server.Controllers
{
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

        [HttpGet]
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

        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            var externalProviders = await signInManager.GetExternalAuthenticationSchemesAsync();
            return View(new LoginViewModel
            {
                ReturnUrl = returnUrl,
                ExternalProviders = externalProviders
            });
        }

        [HttpPost]
        public async Task<IActionResult> LoginPost(LoginViewModel vm)
        {
            // check if the model is valid

            var result = await signInManager.PasswordSignInAsync(vm.Username, vm.Password, true, false);

            if (result.Succeeded)
            {
                return Redirect(vm.ReturnUrl);
            }

            return View();
        }

        [HttpGet]
        public IActionResult Register(string returnUrl)
        {
            return View("Register", new RegisterViewModel { ReturnUrl = returnUrl });
        }

        [HttpPost]
        public async Task<IActionResult> RegisterPost(RegisterViewModel vm)
        {
            if (!ModelState.IsValid)
            {
                return View("Register", vm);
            }

            var user = new IdentityUser(vm.Username);
            var result = await userManager.CreateAsync(user, vm.Password);

            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, true);

                return Redirect(vm.ReturnUrl);
            }

            return View();
        }
    }
}