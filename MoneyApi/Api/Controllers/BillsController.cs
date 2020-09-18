using System.Threading.Tasks;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.ManualCases.NewBill;
using Api.UseCases.ManualCases.RemoveBill;
using Api.UseCases.ManualCases.UpdateBill;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/v1/bills")]
    public class BillsController: Controller
    {
        private readonly IMediator mediator;

        public BillsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetBillsAsync([FromQuery] GetBillsCommand request)
        {
            if (!ModelState.IsValid) return BadRequest();
            
            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpPut("create")]
        public async Task<IActionResult> CreateBillAsync([FromBody] NewBillRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteBillAsync([FromQuery] RemoveBillRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpPatch("update")]
        public async Task<IActionResult> UpdateBillAsync([FromBody] UpdateBillRequest request)
        {
            if (!ModelState.IsValid) return BadRequest();

            var response = await mediator.Send(request);
            return Ok(response);
        }
    }
}