using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PingBackend.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        // GET: api/test
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new  { message = "server is on" });
        }
    }
}
