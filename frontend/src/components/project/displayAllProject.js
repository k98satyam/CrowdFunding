import React, { Component } from 'react'
import { loadProject, updateRecivedAmount } from '../../store/actions/projectAction'
import { connect } from 'react-redux'
import CrowdFunding from '../../build/contracts/CrowdFunding.json'
import Web3 from 'web3'

class DisplayAllProject extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            amount: '0',
            ethAdd: '',
            web3 : null,
            account : '',
            contract: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.donateEther = this.donateEther.bind(this)
    }

    async componentDidMount () {
        this.props.loadProject()
        await this.loadWeb3()
        await this.loadBlockChainData()
    }

    componentWillUnmount() {}

    async loadWeb3() {
        if (window.ethereum) {
            console.log("Enabled")
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockChainData() {
        const web3 = window.web3
        //load Account
        const accounts = await web3.eth.getAccounts()
        // console.log(accounts[0])
        this.setState({ account : accounts[0] })
        //Find NetworkID
        const networkID = await web3.eth.net.getId()
        // console.log(networkID)
        const networkData = CrowdFunding.networks[networkID]
        // console.log(networkData)
        if (networkData) {
          const instance = new web3.eth.Contract(CrowdFunding.abi,networkData.address)
          //console.log(instance)
          this.setState({ web3 : web3, contract : instance})
        }
        else {
          window.alert('Social Network Contract not deployed to this network')
        }
      }

    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    donateEther = (event,id) => {
        event.preventDefault()
        // console.log(this.state.contract)
        const amount = this.state.web3.utils.toWei(this.state.amount, 'Ether')
        console.log(this.state)
        // this.state.contract.methods.TransferEth(this.state.ethAdd).send({from : this.state.account, value : amount})
        this.props.updateRecivedAmount(id,this.state.amount)
        window.open('http://localhost:3001/','_self')
    }

    render() {
        // if (this.props.log_status === false) {
        //     return (
        //         <Redirect to='/signin' />
        //     )
        // }
        if (this.props.projects === null || undefined) {
            return (
                <div></div>
            )
        }
        else {
            // console.log(this.props.projects.data)
            const allProject = this.props.projects.data
            return (
                <div>
                    { allProject && allProject.map(project => {
                            return (  
                                <div className='roww' key = { project._id }>
                                    <div className='leftcolumn'>
                                        <form className='caard' id='form' key = { project._id }>
                                            <h3>{ project.projectTitle }</h3>
                                            <h5>Description : </h5>
                                            <p>{ project.description } </p>
                                            <h5>Project Goal(In Ether) : { project.goal } </h5>
                                            <h5>Uploaded by : { project.authorName }</h5>
                                            <h5>Recived Donation(In Ether) : { project.recived } </h5>
                                            {/* <img src={ project.url } height="250" width="400"/> */}
                                            <input placeholder="Amount In Ether" type = 'number' id = 'amount' onChange = { this.handleChange }/>
                                            <input placeholder="Ethereum Address" type = 'text' id = 'ethAdd' onChange = { this.handleChange }/>
                                            <button onClick = { (event) => this.donateEther(event,project._id) }>Donate</button>
                                            <br />
                                            <br />
                                        </form>
                                    </div>
                                </div>
                            )
                    })}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        projects : state.project.projects,
        log_status: state.auth.log_status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProject : () => dispatch(loadProject()),
        updateRecivedAmount: (id,amount) => dispatch(updateRecivedAmount(id,amount))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayAllProject)