using PingBackend.Models.Group;

namespace PingBackend.Services.GroupService
{
    public interface IGroupService
    {
        Group GetGroup(string groupId); // to get group by groupID

        List<Group> GetAllGroups(); // for testing
    }
}
