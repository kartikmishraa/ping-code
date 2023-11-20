using PingBackend.Models.Message;

namespace PingBackend.Services.MessageService
{
    public interface IMessageService
    {
        Message CreateMessage(Message message);

        List<Message> GetMessagesByIds(string senderId, string receiverId);
    }
}
