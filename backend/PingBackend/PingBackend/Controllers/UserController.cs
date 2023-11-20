using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PingBackend.Models.User;
using PingBackend.Services.UserService;

namespace PingBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET api/users
        [Authorize]
        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }

        // GET api/users/{id}
        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> GetUser(string id)
        {
            var user = _userService.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/users
        [Authorize]
        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] User user)
        {
            var createdUser = _userService.CreateUser(user);

            return CreatedAtRoute("GetUser", new { id = createdUser.Id }, createdUser);
        }

        // PUT api/users/{id}
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateUser(string id, [FromBody] User user)
        {
            _userService.UpdateUser(id, user);

            return NoContent();
        }

        // DELETE api/users/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id) 
        {  
            _userService.DeleteUser(id); 
            return NoContent(); 
        }
    }
}
