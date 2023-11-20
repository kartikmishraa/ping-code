using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PingBackend.Models.Announcement;
using PingBackend.Services.AnnouncementService;

namespace PingBackend.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        // GET api/announcements
        [Authorize]
        [HttpGet]
        public ActionResult GetAnnouncements()
        {
            var announcements = _announcementService.GetAnnouncements();

            if (announcements == null)
            {
                return NotFound();
            }

            return Ok(announcements);
        }

        // POST api/announcements
        [Authorize]
        [HttpPost]
        public ActionResult PostAnnouncements([FromBody] Announcement announcement)
        {
            if (announcement == null)
            {
                return BadRequest();
            }

            var createdAnnouncement = _announcementService.CreateAnnouncement(announcement);

            return Ok(createdAnnouncement);
        } 
    }
}
