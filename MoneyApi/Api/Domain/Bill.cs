using Api.Domain.Abstractions;

namespace Api.Domain
{
    public class Bill: Entity
    {
        public User Owner { get; set; }
        public string Title { get; set; }
    }
}
