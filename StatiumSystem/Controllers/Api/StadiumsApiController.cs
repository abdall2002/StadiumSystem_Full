using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StatiumSystem.Data;
using StatiumSystem.Models;

[Route("api/[controller]")]
[ApiController]
public class StadiumsApiController : ControllerBase
{
    private readonly StadiumDbContext _context;

    public StadiumsApiController(StadiumDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetStadiums()
    {
        var stadiums = await _context.Stadiums.ToListAsync();
        return Ok(stadiums);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Stadium>> GetStadium(int id)
    {
        var stadium = await _context.Stadiums.FindAsync(id);

        if (stadium == null)
        {
            return NotFound();
        }

        return stadium;
    }
}
