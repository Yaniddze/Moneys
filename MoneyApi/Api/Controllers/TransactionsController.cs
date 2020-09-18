using System.Threading.Tasks;
using Api.UseCases.Commands.TransactionCommands;
using Api.UseCases.ManualCases.NewTransaction;
using Api.UseCases.ManualCases.RemoveTransaction;
using Api.UseCases.ManualCases.UpdateTransaction;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/v1/transactions")]
    public class TransactionsController: Controller
    {
        private readonly IMediator _mediator;

        public TransactionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetTransactionAsync([FromQuery] GetTransactionsCommand request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("add")]
        public async Task<IActionResult> AddTransactionAsync([FromBody] NewTransactionRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPatch("update")]
        public async Task<IActionResult> UpdateTransactionAsync([FromBody] UpdateTransactionRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteTransactionAsync([FromQuery] RemoveTransactionRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}