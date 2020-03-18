function submitMsg() {
    const myName = "Jonathan";

    var senderName = document.getElementById("name").value;
    var senderAddress = document.getElementById("email").value;
    var senderMsg = document.getElementById("message").value;

    var msgOutput = "Dear " + myName + ",\n" +
                senderMsg + "\n" +
                "\n" +
                "Sincerely,\n" + 
                senderName + " (A.K.A. " + senderAddress + ")";

    alert(msgOutput);
}