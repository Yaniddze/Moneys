using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class IdentityContext: IdentityDbContext
    {
        public IdentityContext(DbContextOptions<IdentityContext> options)
            : base(options) { }
    }
}