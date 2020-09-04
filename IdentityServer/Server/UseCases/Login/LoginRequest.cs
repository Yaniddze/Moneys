using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Server.UseCases.Login
{
    public class LoginRequest: IRequest<LoginResponse>
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}