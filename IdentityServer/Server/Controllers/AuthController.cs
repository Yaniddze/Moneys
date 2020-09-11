using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Server.UseCases.Login;
using Server.UseCases.Register;

namespace Server.Controllers
{
    [Route("api/v1/auth")]
    public class AuthController: Controller
    {
        private readonly IMediator _mediator;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        
        public AuthController(
            IMediator mediator,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager
            )
        {
            _mediator = mediator;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new LoginResponse
                {
                    Success = false,
                    Errors = GetModelStateErrors()
                });
            }

            var response = await _mediator.Send(request);

            return Ok(response);
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RegisterResponse
                {
                    Success = false,
                    Errors = GetModelStateErrors()
                });
            }

            var response = await _mediator.Send(request);

            return Ok(response);
        }

        [HttpPost("external_login")]
        public async Task<IActionResult> ExternalLoginAsync([FromBody] string returnUrl)
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            if (info is null)
            {
                return Ok(new
                {
                    Success = false,
                    Errors = new[] {"Bad redirect"},
                });
            }

            var result = await _signInManager
                .ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

            if (result.Succeeded)
            {
                return Ok(new
                {
                    Success = true,
                });
            }

            var username = info.Principal.FindFirst(ClaimTypes.Name).Value.Replace(" ", "_");
            return Ok(new
            {
                Success = false,
                NeedToRegister = true,
                Username = username,
                ReturnUrl = returnUrl,
            });
        }

        [HttpPost("external_register")]
        public async Task<IActionResult> ExternalRegisterAsync([FromBody] ExternalRegisterVM vm)
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info is null)
            {
                return Ok(new
                {
                    Success = false,
                    Errors = new[] {"Bad redirect"},
                });
            }
            
            var user = new IdentityUser(vm.Username);
            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return Ok(new
                {
                    Success = false,
                    Errors = new[] {"Username is already exists"},
                });
            }

            await _signInManager.SignInAsync(user, false);
            
            return Ok(new
            {
                Success = true,
                Errors = new[] {"Bad redirect"},
            });
        }

        public class ExternalRegisterVM
        {
            public string ReturnUrl { get; set; }
            public string Username { get; set; }
        }

        private IEnumerable<string> GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray(), ", "));
    }
}