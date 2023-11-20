using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PingBackend.Models.Group
{
    public class Group
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("groupMembers")]
        public List<string> GroupMembersIds { get; set; } = new List<string>();

        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.MinValue;
    }
}
