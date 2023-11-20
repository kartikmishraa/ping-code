﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PingBackend.Models.Message
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("content")]
        public string Content { get; set; } = string.Empty;

        [BsonElement("senderId")]
        public string SenderId { get; set; } = string.Empty;

        [BsonElement("receiverId")]
        public string ReceiverId { get; set; } = string.Empty;

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.MinValue;
    }
}
