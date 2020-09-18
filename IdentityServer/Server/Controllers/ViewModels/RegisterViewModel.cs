using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        public string Username { get; set; }
        [EmailAddress] 
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        public string ReturnUrl { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}