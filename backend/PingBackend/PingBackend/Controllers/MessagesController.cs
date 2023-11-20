using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PingBackend.Models.Message;
using PingBackend.Services.MessageService;

namespace PingBackend.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        // POST api/chat
        [Authorize]
        [HttpPost]
        public ActionResult<Message> CreateMessage([FromBody] Message message)
        {
            var createdMessage = _messageService.CreateMessage(message);

            return Ok(new { createdMessage = createdMessage });
        }

        // GET api/chat/senderId/receiverId
        [Authorize]
        [HttpGet("{senderId}/{receiverId}")]
        public ActionResult<List<Message>> GetMessagesById(string senderId, string receiverId)
        {
            try
            {
                var messages = _messageService.GetMessagesByIds(senderId, receiverId);

                if (messages == null || messages.Count == 0)
                {
                    return NotFound();
                }

                return messages;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
