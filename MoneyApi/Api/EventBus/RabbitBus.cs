﻿using System;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Server.EventBus.Abstractions;

namespace Server.EventBus
{
    public class RabbitBus: IEventBus
    {
        private readonly IConnection _connection;
        private readonly IServiceProvider _serviceProvider;
        private IModel _channel;

        private IModel Channel => _channel ??= _connection.CreateModel();

        public RabbitBus(IConnectionFactory connection, IServiceProvider serviceProvider)
        {
            _connection = connection.CreateConnection();
            _serviceProvider = serviceProvider;
        }

        public void Publish(IIntegrationEvent @event, string exchangeName)
        {
            CreateExchangeIfNotExist(exchangeName);

            var json = JsonConvert.SerializeObject(@event);
            var bytes = Encoding.UTF8.GetBytes(json);
            
            Channel.BasicPublish(exchangeName, string.Empty, body: bytes);
        }

        public void Subscribe<TEvent, THandler>(string exchangeName, string subscriberName) 
            where TEvent : IIntegrationEvent 
            where THandler : IIntegrationEventHandler<TEvent>
        {
            BindQueue(exchangeName, subscriberName);
            
            var consumer = new AsyncEventingBasicConsumer(Channel);

            consumer.Received += async (obj, args) =>
            {
                using var scope = _serviceProvider.CreateScope();
                
                var handler = scope.ServiceProvider.GetService<IIntegrationEventHandler<TEvent>>();

                var jsonRequest = Encoding.UTF8.GetString(args.Body.ToArray());
                var request = JsonConvert.DeserializeObject<TEvent>(jsonRequest);

                await handler.HandleAsync(request);

                Channel.BasicAck(args.DeliveryTag, false);
            };

            Channel.BasicConsume(subscriberName, false, consumer);
        }

        private void CreateExchangeIfNotExist(string exchangeName)
        {
            Channel.ExchangeDeclare(exchangeName, ExchangeType.Fanout, true);
        }

        private void BindQueue(string exchangeName, string subscriberName)
        {
            CreateExchangeIfNotExist(exchangeName);

            Channel.QueueDeclare(subscriberName, true, false, autoDelete: false);
            Channel.QueueBind(subscriberName, exchangeName, string.Empty);
        }
    }
}