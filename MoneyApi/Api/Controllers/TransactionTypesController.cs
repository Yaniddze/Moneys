using System.Threading.Tasks;
using Api.UseCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/v1/transaction_types")]
    [Authorize]
    public class TransactionTypesController: Controller
    {
        private readonly IMediator mediator;

        public TransactionTypesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetTransactionTypesAsync([FromQuery] GetTransactionTypesCommand request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await mediator.Send(request);
            return Ok(response);
        }
    }
}