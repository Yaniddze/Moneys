using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Server.Controllers.Requests;
using Server.Controllers.Responses;

namespace Server.Controllers
{
    [Route("api/v1/auth")]
    public class AuthController: Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        
        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
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
            var signInResult = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);

            if (signInResult.Succeeded)
            {
                return Ok(new LoginResponse
                {
                    Success = true,
                });
            }
            
            return Ok(new LoginResponse
            {
                Success = false,
                Errors = new []{ "User doesn't exist" }
            });
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
            var user = new IdentityUser(request.Username);

            var registerResult = await _userManager.CreateAsync(user, request.Password);

            if (!registerResult.Succeeded) return Ok(new RegisterResponse
            {
                Success = false,
                Errors = registerResult.Errors.Select(x => x.Description)
            });
            
            await _signInManager.SignInAsync(user, false);
            return Ok(new RegisterResponse
            {
                Success = true,
            });
        }

        private IEnumerable<string> GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray(), ", "));
    }
}