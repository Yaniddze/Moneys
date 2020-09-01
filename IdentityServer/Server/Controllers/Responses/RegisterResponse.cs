using System.Collections.Generic;

namespace Server.Controllers.Responses
{
    public class RegisterResponse
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}