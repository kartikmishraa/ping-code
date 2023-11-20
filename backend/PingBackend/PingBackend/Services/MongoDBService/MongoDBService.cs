using MongoDB.Driver;
using PingBackend.Models.Announcement;
using PingBackend.Models.Group;
using PingBackend.Models.Message;
using PingBackend.Models.MongoDBSettings;
using PingBackend.Models.User;

namespace PingBackend.Services.MongoDBService
{
    public class MongoDBService : IMongoDBService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Message> _messages;
        private readonly IMongoCollection<Group> _groups;
        private readonly IMongoCollection<Announcement> _announcements;

        // add more collections here..

        public MongoDBService(MongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>("users");
            _messages = database.GetCollection<Message>("messages");
            _groups = database.GetCollection<Group>("groups");
            _announcements = database.GetCollection<Announcement>("announcements");
        }


        public IMongoCollection<User> Users => _users;
        public IMongoCollection<Message> Messages => _messages;
        public IMongoCollection<Group> Groups => _groups;

        public IMongoCollection<Announcement> Announcements => _announcements;
    }
}
