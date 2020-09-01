﻿using System.Collections.Generic;

namespace Server.Controllers.Responses
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}