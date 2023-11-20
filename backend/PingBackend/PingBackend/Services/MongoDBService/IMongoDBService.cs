using MongoDB.Driver;
using PingBackend.Models.User;
using PingBackend.Models.Message;
using PingBackend.Models.Group;
using PingBackend.Models.Announcement;

namespace PingBackend.Services.MongoDBService
{
    public interface IMongoDBService
    {
        IMongoCollection<User> Users { get; }

        IMongoCollection<Message> Messages { get; }

        IMongoCollection<Group> Groups { get; }

        IMongoCollection<Announcement> Announcements {  get; }
    }
}
