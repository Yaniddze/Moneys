using Microsoft.EntityFrameworkCore;

namespace Api.DataBase
{
    public class MoneysContext: DbContext
    {
        public MoneysContext(DbContextOptions<MoneysContext> options)
            :base(options) { }
    }
}