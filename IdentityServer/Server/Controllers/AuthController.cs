using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
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
        
        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
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

        private IEnumerable<string> GetModelStateErrors() => ModelState.Values.Select(x =>
            Strings.Join(x.Errors.Select(error => error.ErrorMessage).ToArray(), ", "));
    }
}