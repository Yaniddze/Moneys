using Api.Domain.Abstractions;

namespace Api.Domain
{
    public class User: Entity
    {
        public string Username { get; set; }
    }
}