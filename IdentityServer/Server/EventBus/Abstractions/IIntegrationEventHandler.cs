using System.Threading.Tasks;

namespace Server.EventBus.Abstractions
{
    public interface IIntegrationEventHandler<TEvent>
    {
        Task HandleAsync(TEvent @event);
    }
}