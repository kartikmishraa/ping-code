using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PingBackend.Models.User;
using PingBackend.Services.AuthService;

namespace PingBackend.Controllers
{
    [Authorize]
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST api/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody] User user)
        {
            var token = _authService.RegisterAsync(user.Email, user.Password);

            if (token == null)
            {
                return BadRequest("Registration failed. Email might already be in use.");
            }

            return Ok(new { token = token });
        }

        // POST api/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] User user)
        {
            var token = _authService.LoginAsync(user.Email, user.Password);

            if (token == null)
            {
                return Unauthorized("Invalid Credentials");
            }

            return Ok(new { token = token });
        }
    }
}
