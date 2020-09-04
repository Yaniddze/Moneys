using System.Collections.Generic;

namespace Server.UseCases.Login
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}