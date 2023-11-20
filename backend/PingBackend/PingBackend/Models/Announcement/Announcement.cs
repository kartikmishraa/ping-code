using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PingBackend.Models.Announcement
{
    public class Announcement
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("content")]
        public string Content { get; set; } = String.Empty;

        [BsonElement("author")]
        public string Author { get; set; } = String.Empty;
    }
}
