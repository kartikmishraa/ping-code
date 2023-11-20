using MongoDB.Driver;
using PingBackend.Models.Message;
using PingBackend.Services.MongoDBService;

namespace PingBackend.Services.MessageService
{
    public class MessageService : IMessageService
    {
        private readonly IMongoDBService _dbService;

        public MessageService(IMongoDBService dBService)
        {
            _dbService = dBService;
        }
        public Message CreateMessage(Message message)
        {
            message.Timestamp = DateTime.Now;

            _dbService.Messages.InsertOne(message);

            return message;
        }

        public List<Message> GetMessagesByIds(string senderId, string receiverId)
        {
            //throw new NotImplementedException();
            /*
             1. Fetch all messages from sender to receiver and from
            receiver to sender.

            2. Sort them by timestamp

            3. Send
             */

            // Fetch messages from sender to receiver
            var senderToReceiveFilter = Builders<Message>.Filter.And(
                Builders<Message>.Filter.Eq("SenderId", senderId),
                Builders<Message>.Filter.Eq("ReceiverId", receiverId)
            );
            var senderToReceiverMessages = _dbService.Messages.Find(senderToReceiveFilter).ToList();

            // Fetch messages from receiver to sender
            var receiverToSenderFilter = Builders<Message>.Filter.And(
                Builders<Message>.Filter.Eq("SenderId", receiverId),
                Builders<Message>.Filter.Eq("ReceiverId", senderId)
            );
            var receiverToSenderMessages = _dbService.Messages.Find(receiverToSenderFilter).ToList();

            // Combine messages from both directions into a single list
            var allMessages = senderToReceiverMessages.Concat(receiverToSenderMessages).ToList();

            // Sort the combined list by timestamp
            var sortedMessages = allMessages.OrderBy(message => message.Timestamp).ToList();

            return sortedMessages;
        }
    }
}
