using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PingBackend.Models.User
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("password")]
        public string Password { get; set; } = string.Empty;

        [BsonElement("role")]
        public string Role { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;


        [BsonElement("isProfileSetup")]
        public bool IsProfileSetup { get; set; } = false;

        [BsonElement("phoneNumber")]
        public string PhoneNumber { get; set; } = string.Empty;

        [BsonElement("designation")]
        public string Designation {  get; set; } = string.Empty;

        [BsonElement("departmentName")]
        public string DepartmentName {  get; set; } = string.Empty;

        [BsonElement("groupIds")]
        public List<string> GroupIds { get; set; } = new List<string>();

        [BsonElement("isOnline")]
        public bool IsOnline { get; set; } = false;

        [BsonElement("availabilityStatus")]
        public string AvailabilityStatus { get; set; } = string.Empty;

        [BsonElement("lastLogin")]
        public DateTime LastLogin { get; set; } = DateTime.MinValue;
    }
}
