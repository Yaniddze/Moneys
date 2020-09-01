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

        public AuthController(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
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

        private IEnumerable<string> GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray(), ", "));
    }
}