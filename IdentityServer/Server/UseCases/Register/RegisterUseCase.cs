using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Server.UseCases.Register
{
    public class RegisterUseCase: IRequestHandler<RegisterRequest, RegisterResponse>
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public RegisterUseCase(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
        {
            var user = new IdentityUser(request.Username)
            {
                Email = request.Email
            };

            var registerResult = await _userManager.CreateAsync(user, request.Password);

            if (!registerResult.Succeeded) return new RegisterResponse
            {
                Success = false,
                Errors = registerResult.Errors.Select(x => x.Description)
            };
            
            await _signInManager.SignInAsync(user, false);
            
            return new RegisterResponse
            {
                Success = true,
            };
        }
    }
}