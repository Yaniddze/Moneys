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
        private readonly bool _development;
        private readonly MoneysContext _context;
        private readonly IMapper _mapper;

        public static Guid TestableUserGuid = Guid.Parse("8f1b09a8-e850-4a3b-b2a7-352f72c036dd");

        public TestController(IMapper mapper, MoneysContext context)
        {
            _mapper = mapper;
            _context = context;
            _development = (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "").Equals("Development");
        }
        
        [HttpGet("user")]
        public async Task<IActionResult> GetTestableUserAsync()
        {
            if (!_development) return Ok("Can't give testable user in not development mode");

            return Ok(await _context.Users
                .Where(x => x.Id == TestableUserGuid)
                .Select(x => _mapper.Map<UserDB, User>(x))
                .FirstAsync()
            );
        }
    }
}
