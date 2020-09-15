using System.Threading.Tasks;
using Server.EventBus.Abstractions;
using Server.EventBus.Events;

namespace Api.UseCases.EventHandlers
{
    public class NewUserEventHandler: IIntegrationEventHandler<NewUserEvent>
    {
        public static int UsersCount = 0;
        
        public async Task HandleAsync(NewUserEvent @event)
        {
            UsersCount++;
        }
    }
}