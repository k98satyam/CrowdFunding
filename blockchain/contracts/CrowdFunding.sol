pragma solidity >=0.4.21 <0.7.0;

contract CrowdFunding {
    string public name;     //state variable its value is stored in the blockC. and not in memory

    event Donated(
        uint amount,
        address payable sender,
        address payable reciver
    );

    constructor() public {
        name = "Satyam";
    }

    // this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account(this is msg.sender),
    // value: tipAmount(this is msg.value) })
    function TransferEth(address payable receiver) public payable{
        //address payable sender = msg.sender;
        //jo JS script se send kye hai msg.sender, amount directly usse se kaat jaiga and reciver ko transfer kr rahe
        //hai vo amount
        uint amount = msg.value;
        receiver.transfer(amount);
        emit Donated(amount,msg.sender,receiver);
    }
}