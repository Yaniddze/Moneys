using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Server.EventBus.Abstractions;
using Server.EventBus.Events;

namespace Server.UseCases.Register
{
    public class RegisterUseCase: IRequestHandler<RegisterRequest, RegisterResponse>
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IEventBus _eventBus;

        public RegisterUseCase(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IEventBus eventBus)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _eventBus = eventBus;
        }

        public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
        {
            var user = new IdentityUser(request.Username)
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email
            };

            var registerResult = await _userManager.CreateAsync(user, request.Password);

            if (!registerResult.Succeeded) {
                return new RegisterResponse
                {
                    Success = false,
                    Errors = registerResult.Errors.Select(x => x.Description)
                };
            }
            
            _eventBus.Publish(new NewUserEvent
            {
                Username = request.Username,
                Id = user.Id,
            }, nameof(NewUserEvent));
            
            await _signInManager.SignInAsync(user, false);

            return new RegisterResponse
            {
                Success = true,
            };
        }
    }
}