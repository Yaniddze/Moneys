using System.Collections.Generic;

namespace Server.UseCases.Register
{
    public class RegisterResponse
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}