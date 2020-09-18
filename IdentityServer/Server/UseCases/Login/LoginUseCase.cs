using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Server.UseCases.Login
{
    public class LoginUseCase: IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly SignInManager<IdentityUser> _signInManager;

        public LoginUseCase(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(request.Username, request.Password, true, false);

            if (signInResult.Succeeded)
            {
                return new LoginResponse
                {
                    Success = true,
                };
            }
            
            return new LoginResponse
            {
                Success = false,
                Errors = new []{ "User doesn't exist" }
            };
        }
    }
}