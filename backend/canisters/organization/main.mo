import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor OrganizationActor {
    type OrganizationId = Nat32;
    type Organization = {
        name : Text;
    };

    private let organizations = HashMap.HashMap<Text, Organization>(0, Text.equal, Text.hash);

    stable var organizationId : OrganizationId = 0;

    private func generateId() : Nat32 {
        organizationId += 1;
        return organizationId;
    };

    public shared (msg) func create(name : Text) : async Text {
        let user : Text = Principal.toText(msg.caller);
        let org = {
            creator = user;
            name = name;
        };
        let id : Text = Nat32.toText(generateId());
        organizations.put(id, org);

        return id;
    };

    public query func getAll() : async [(Text, Organization)] {
        let organizationsIter : Iter.Iter<(Text, Organization)> = organizations.entries();
        let orgs : [(Text, Organization)] = Iter.toArray(organizationsIter);
        return orgs;
    };

    public query func findById(id : Text) : async ?Organization {
        let orgs : ?Organization = organizations.get(id); // TODO: Return only one item and not an array
        return orgs;
    };
};
