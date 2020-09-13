using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Server.Controllers.ViewModels;
using Server.Options;

namespace Server.Controllers
{
    public class ExternalController: Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationUrls _urls;

        public ExternalController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, 
            ApplicationUrls urls)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _urls = urls;
        }
        
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUri = Url.Action(nameof(ExternalLoginCallback), "External", new
            {
                returnUrl = returnUrl ?? _urls.DefaultRedirect
            });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUri);
            return Challenge(properties, provider);
        }

        public async Task<IActionResult> ExternalLoginCallback(string returnUrl)
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Redirect(_urls.LoginPage);
            }

            var result = await _signInManager
                .ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

            if (result.Succeeded)
            {
                return Redirect(returnUrl ?? _urls.DefaultRedirect);
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
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Redirect(_urls.LoginPage);
            }

            var user = new IdentityUser(vm.Username)
            {
                Email = info.Principal.Claims.First(x => x.Type == ClaimTypes.Email).Value, 
                EmailConfirmed = true,
            };
            var registerResult = await _userManager.CreateAsync(user);

            if (!registerResult.Succeeded)
            {
                return View(new ExternalRegisterViewModel
                {
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                    Errors = Strings.Join(registerResult.Errors.Select(x => x.Description).ToArray()),
                });
            }

            var loginResult = await _userManager.AddLoginAsync(user, info);

            if (!loginResult.Succeeded)
            {
                return View(new ExternalRegisterViewModel
                {
                    ReturnUrl = vm.ReturnUrl,
                    Username = vm.Username,
                    Errors = Strings.Join(loginResult.Errors.Select(x => x.Description).ToArray()),
                });
            }

            await _signInManager.SignInAsync(user, false);

            return Redirect(vm.ReturnUrl ?? _urls.DefaultRedirect);
        }
    }
}