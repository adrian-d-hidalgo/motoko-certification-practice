import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor CertificateActor {
    type CertificateId = Nat32;
    type Certificate = {
        student : Text;
        course : Text;
        institution : Text;
    };

    stable var certficateId : CertificateId = 0;

    let certificateList = HashMap.HashMap<Text, Certificate>(0, Text.equal, Text.hash);

    private func generateId() : Nat32 {
        certficateId += 1;
        return certficateId;
    };

    public shared (msg) func create(student : Text, course : Text, institution : Text) : async Text {
        let user : Text = Principal.toText(msg.caller);
        let certificate = {
            creator = user;
            student = student;
            course = course;
            institution = institution;
        };
        let id : Text = Nat32.toText(generateId());
        certificateList.put(id, certificate);
        return id;
    };

    public query func getAll() : async [(Text, Certificate)] {
        let certificateIter : Iter.Iter<(Text, Certificate)> = certificateList.entries();
        let certificateArray : [(Text, Certificate)] = Iter.toArray(certificateIter);
        return certificateArray;
    };

    public query func findById(id : Text) : async ?Certificate {
        let certificate : ?Certificate = certificateList.get(id); // TODO: Return only one item and not an array
        return certificate;
    };
};
