﻿using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands
{
    public class RemoveBillCommand: IRequest<AbstractAnswer>
    {
        public Guid UserId { get; set; }
        public Guid BillId { get; set; }
    }
}