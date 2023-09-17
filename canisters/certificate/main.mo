import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Certificate {
    type CertificateId = Nat32;
    type Certificate = {
        student : Text;
        course : Text;
        institution : Text;
    };

    stable var certficateId : CertificateId = 0;

    let certificateList = HashMap.HashMap<Text, Certificate>(0, Text.equal, Text.hash);

    private func generateCertificateId() : Nat32 {
        certficateId += 1;
        return certficateId;
    };

    public shared (msg) func createCertificate(student : Text, course : Text, institution : Text) {
        let user : Text = Principal.toText(msg.caller);
        let certificate = {
            creator = user;
            student = student;
            course = course;
            institution = institution;
        };
        certificateList.put(Nat32.toText(generateCertificateId()), certificate);
        Debug.print("New post created! ID: " # Nat32.toText(certficateId));
        return ();
    };

    public query func getCertificates() : async [(Text, Certificate)] {
        let certificateIter : Iter.Iter<(Text, Certificate)> = certificateList.entries();
        let certificateArray : [(Text, Certificate)] = Iter.toArray(certificateIter);

        return certificateArray;
    };
};
