using System;
using System.Linq;
using System.Threading.Tasks;
using Api.DataBase;
using Api.DataBase.DbEntities;
using Api.Domain;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/v1/test")]
    public class TestController: Controller
    {
        private readonly bool development;
        private readonly MoneysContext context;
        private readonly IMapper mapper;

        public static Guid TestableUserGuid = Guid.Parse("8f1b09a8-e850-4a3b-b2a7-352f72c036dd");

        public TestController(IMapper mapper, MoneysContext context)
        {
            this.mapper = mapper;
            this.context = context;
            development = (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "").Equals("Development");
        }
        
        [HttpGet("user")]
        public async Task<IActionResult> GetTestableUserAsync()
        {
            if (!development) return Ok("Can't give testable user in not development mode");

            return Ok(await context.Users
                .Where(x => x.Id == TestableUserGuid)
                .Select(x => mapper.Map<UserDB, User>(x))
                .FirstAsync()
            );
        }
    }
}
