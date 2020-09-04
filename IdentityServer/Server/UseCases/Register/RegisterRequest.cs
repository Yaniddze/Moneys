using System.ComponentModel.DataAnnotations;
using MediatR;

namespace Server.UseCases.Register
{
    public class RegisterRequest: IRequest<RegisterResponse>
    {
        [Required]
        public string Username { get; set; }
        [Required]        
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}