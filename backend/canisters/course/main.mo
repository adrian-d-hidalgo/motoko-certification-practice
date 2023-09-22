import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor CourseActor {
    type CourseId = Nat32;
    type Course = {
        name : Text;
    };

    stable var courseId : CourseId = 0;

    let courseList = HashMap.HashMap<Text, Course>(0, Text.equal, Text.hash);

    private func generateCourseId() : Nat32 {
        courseId += 1;
        return courseId;
    };

    public shared (msg) func create(name : Text) : async Text {
        let user : Text = Principal.toText(msg.caller);
        let course = {
            creator = user;
            name = name;
        };
        let certId : Text = Nat32.toText(generateCourseId());
        courseList.put(certId, course);
        return certId;
    };

    public query func getAll() : async [(Text, Course)] {
        let courseIter : Iter.Iter<(Text, Course)> = courseList.entries();
        let courseArray : [(Text, Course)] = Iter.toArray(courseIter);
        return courseArray;
    };
};
